// routes/api/paypal/create-order.ts
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
  async POST(req) {
    const { amount, currency, items } = await req.json()
    const accessToken = await getAccessToken()
    const url = new URL(req.url)
    const hostname = Deno.env.get('WEB_HOST')
      ? ('9002-' + Deno.env.get('WEB_HOST'))
      : url.host
    const baseUrl = 'https://' + hostname

    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
              breakdown: {
                item_total: { currency_code: currency, value: amount },
              },
            },
            items,
          },
        ],
        application_context: {
          return_url: `${baseUrl}/checkout/review`,
          cancel_url: `${baseUrl}/checkout/review`,
          brand_name: 'Sternvoll Jewelry',
          shipping_preference: 'GET_FROM_FILE', // Collect buyer shipping info via PayPal
        },
      }),
    })

    if (!orderResponse.ok) {
      console.log(orderResponse, await orderResponse.text())
      return new Response('Failed to create PayPal order', { status: 500 })
    }

    const orderData = await orderResponse.json()
    return new Response(JSON.stringify({ id: orderData.id }), { status: 200 })
  },
}
