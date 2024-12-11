// routes/api/paypal/capture-payment.ts
import { Handlers } from '$fresh/server.ts'
import { savePaypalOrder } from '@/utils/orders.ts'

const PAYPAL_API_BASE = Deno.env.get('PAYPAL_API_BASE')
const CLIENT_ID = Deno.env.get('PAYPAL_CLIENT')
const SECRET = Deno.env.get('PAYPAL_SECRET')

async function getAccessToken() {
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    throw new Error('Failed to obtain PayPal access token')
  }

  const data = await response.json()
  return data.access_token
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const { token } = await req.json()

      if (!token) {
        return new Response(
          JSON.stringify({ error: 'Missing token' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } },
        )
      }

      const accessToken = await getAccessToken()

      // Retrieve order details
      const response = await fetch(
        `${PAYPAL_API_BASE}/v2/checkout/orders/${token}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve PayPal order details' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } },
        )
      }

      const paypalCart = await response.json()

      const cartId = paypalCart.id // Extracting the `id` field

      if (typeof cartId !== 'string') {
        throw new Error(
          `Invalid cartId: Expected a string but received ${typeof cartId}`,
        )
      }

      // Capture the payment
      const captureResponse = await fetch(
        `${PAYPAL_API_BASE}/v2/checkout/orders/${token}/capture`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )

      if (!captureResponse.ok) {
        return new Response(
          JSON.stringify({ error: 'Failed to capture payment' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } },
        )
      }

      // Save the order with PayPal details
      await savePaypalOrder(cartId, token, { ...paypalCart, captureResponse })

      return new Response(
        JSON.stringify({ success: true, cartId }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      )
    } catch (err) {
      console.error('Error in capture-payment:', err)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      )
    }
  },
}
