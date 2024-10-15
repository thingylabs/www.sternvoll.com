import { signal } from '@preact/signals'
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

// Signal to hold cart data
export const cart = signal<CartData | null>(null)

// GraphQL query for cart data
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

// Shopify GraphQL helper function
async function shopifyGraphql<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch('/api/shopify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Error fetching data: ${res.statusText}`)
  }

  const json = await res.json()
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join('\n'))
  }

  return json.data
}

// Fetch cart data or create a new cart if none exists
export async function fetchCartData(): Promise<void> {
  const id = localStorage.getItem('cartId')
  if (id === null) {
    const { cartCreate } = await shopifyGraphql<
      { cartCreate: { cart: CartData } }
    >(
      `mutation { cartCreate { cart ${CART_QUERY} } }`,
    )
    localStorage.setItem('cartId', cartCreate.cart.id)
    cart.value = cartCreate.cart
  } else {
    const { cart: fetchedCart } = await shopifyGraphql<{ cart: CartData }>(
      `query($id: ID!) { cart(id: $id) ${CART_QUERY} }`,
      { id },
    )

    if (fetchedCart === null) {
      // If the cart is null, reset and fetch a new cart
      localStorage.removeItem('cartId')
      await fetchCartData()
    } else {
      cart.value = fetchedCart
    }
  }
}

// Add items to the cart
const ADD_TO_CART_QUERY =
  `mutation add($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart ${CART_QUERY}
  }
}`

export async function addToCart(
  cartId: string,
  productId: string,
): Promise<void> {
  const { cart: updatedCart } = await shopifyGraphql<{ cart: CartData }>(
    ADD_TO_CART_QUERY,
    {
      cartId,
      lines: [{ merchandiseId: productId }],
    },
  )
  cart.value = updatedCart // Update the cart signal with the new cart data
}

// Remove items from the cart
const REMOVE_FROM_CART_MUTATION =
  `mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart ${CART_QUERY}
  }
}`

export async function removeFromCart(
  cartId: string,
  lineItemId: string,
): Promise<void> {
  const { cart: updatedCart } = await shopifyGraphql<{ cart: CartData }>(
    REMOVE_FROM_CART_MUTATION,
    {
      cartId,
      lineIds: [lineItemId],
    },
  )
  cart.value = updatedCart // Update the cart signal after removal
}

// Function to format currency amounts
export function formatCurrency(amount: Money): string {
  const intl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: amount.currencyCode,
  })
  return intl.format(amount.amount)
}
