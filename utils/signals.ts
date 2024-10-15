import { signal } from '@preact/signals'
import { CartData, Money } from '@/utils/types.ts'

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

// GraphQL helper function for Shopify
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

// Fetch cart data or create a new cart if necessary
export async function fetchCartData(): Promise<void> {
  try {
    const id = localStorage.getItem('cartId')
    if (!id) {
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

      if (!fetchedCart) {
        // If cart is null, assume the cart was already completed, so create a new cart
        localStorage.removeItem('cartId')
        await fetchCartData()
      } else {
        cart.value = fetchedCart
      }
    }
  } catch (error) {
    console.error('Error fetching cart data:', error)
  }
}

// Add an item to the cart
const ADD_TO_CART_QUERY = `
  mutation add($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart ${CART_QUERY}
    }
  }
`

export async function addToCart(
  cartId: string,
  productId: string,
): Promise<void> {
  try {
    const { cart: updatedCart } = await shopifyGraphql<{ cart: CartData }>(
      ADD_TO_CART_QUERY,
      {
        cartId,
        lines: [{ merchandiseId: productId }],
      },
    )
    cart.value = updatedCart // Update the cart signal with the new cart data
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

// Remove an item from the cart
const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart ${CART_QUERY}
    }
  }
`

export async function removeFromCart(
  cartId: string,
  lineItemId: string,
): Promise<void> {
  try {
    const { cart: updatedCart } = await shopifyGraphql<{ cart: CartData }>(
      REMOVE_FROM_CART_MUTATION,
      {
        cartId,
        lineIds: [lineItemId],
      },
    )
    cart.value = updatedCart // Update the cart signal after removal
  } catch (error) {
    console.error('Error removing item from cart:', error)
  }
}

// Format currency
export function formatCurrency(amount: Money): string {
  const intl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: amount.currencyCode,
  })
  return intl.format(amount.amount)
}
