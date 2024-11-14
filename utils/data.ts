// utils/data.ts
import useSWR, { mutate } from 'swr'
import { Image, Money } from './types.ts'

export interface CartData {
  id: string
  lines: {
    nodes: {
      id: string
      quantity: number
      merchandise: {
        product: {
          title: string
        }
        title: string
        image: Image
      }
      estimatedCost: {
        totalAmount: Money
      }
    }[]
  }
  checkoutUrl: string
  estimatedCost: {
    totalAmount: Money
  }
}

const CART_QUERY = `{
  id
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ...on ProductVariant {
          title
          image {
            url
            altText
          }
          product {
            title
          }
        }
      }
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
  checkoutUrl
  estimatedCost {
    totalAmount {
      amount
      currencyCode
    }
  }
}`

// deno-lint-ignore no-explicit-any
async function shopifyGraphql<T = any>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch('/api/shopify', {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
  })
  return await res.json()
}

async function cartFetcher(): Promise<CartData> {
  const id = localStorage.getItem('cartId')
  if (id === null) {
    const { cartCreate } = await shopifyGraphql<
      { cartCreate: { cart: CartData } }
    >(`mutation { cartCreate { cart ${CART_QUERY} } }`)
    localStorage.setItem('cartId', cartCreate.cart.id)
    return cartCreate.cart
  }

  const { cart } = await shopifyGraphql(
    `query($id: ID!) { cart(id: $id) ${CART_QUERY} }`,
    { id },
  )
  if (cart === null) {
    localStorage.removeItem('cartId')
    return cartFetcher()
  }

  return cart
}

export function useCart() {
  return useSWR<CartData, Error>('cart', cartFetcher, {})
}

const ADD_TO_CART_QUERY =
  `mutation add($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart ${CART_QUERY}
  }
}`

export async function addToCart(cartId: string, productId: string) {
  const mutation = shopifyGraphql<{ cart: CartData }>(ADD_TO_CART_QUERY, {
    cartId,
    lines: [{ merchandiseId: productId }],
  }).then(({ cart }) => cart)
  await mutate('cart', mutation)
}

const UPDATE_CART_ATTRIBUTES_MUTATION = `
  mutation updateCartAttributes($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function updateCartAttributes(
  cartId: string,
  attribute: { key: string; value: string },
) {
  const response = await shopifyGraphql<
    { cartAttributesUpdate: { userErrors: Array<{ message: string }> } }
  >(
    UPDATE_CART_ATTRIBUTES_MUTATION,
    {
      cartId,
      attributes: [attribute],
    },
  )
  if (response.cartAttributesUpdate.userErrors.length) {
    console.error(
      'Error updating cart attributes:',
      response.cartAttributesUpdate.userErrors,
    )
  }
}

const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart ${CART_QUERY}
    }
  }
`

export async function removeFromCart(cartId: string, lineItemId: string) {
  const mutation = shopifyGraphql<{ cart: CartData }>(
    REMOVE_FROM_CART_MUTATION,
    {
      cartId,
      lineIds: [lineItemId],
    },
  ).then(({ cart }) => cart)
  await mutate('cart', mutation)
}

export function formatCurrency(amount: Money) {
  const currency = amount.currencyCode || 'USD'
  const intl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })
  return intl.format(Number(amount.amount))
}
