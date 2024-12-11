// routes/api/paypal/confirm-payment.ts
import { Handlers } from '$fresh/server.ts'

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
  async GET(req) {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')

    if (!token) {
      return new Response('Missing token', { status: 400 })
    }

    const accessToken = await getAccessToken()

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
      return new Response('Failed to retrieve PayPal order details', {
        status: 500,
      })
    }

    const orderDetails = await response.json()

    // Extract relevant info for seller protection
    const {
      payer: { email_address, name },
      purchase_units,
    } = orderDetails

    const shippingAddress = purchase_units[0]?.shipping?.address

    return new Response(
      JSON.stringify({
        payer: { email: email_address, name },
        shippingAddress,
      }),
      { status: 200 },
    )
  },
}
