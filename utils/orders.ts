// utils/orders.ts
import { CheckoutFormData } from '@/utils/types.ts'
import { generateOrderNumber } from '@/utils/generateOrderNumber.ts'
import { kv } from '@/utils/kv.ts'
import { dateString } from '@/utils/dateString.ts'

const env = Deno.env.get('ENV')!
const site = 'www.sternvoll.com'

export async function saveBankOrder(
  cartId: string,
  formData: CheckoutFormData,
): Promise<string> {
  const orderNumber = generateOrderNumber(cartId)
  const order = {
    cartId,
    orderNumber,
    formData,
    createdAt: new Date().toISOString(),
    status: 'pending_payment',
  }
  await kv.german
    .set([site, env, 'orders', 'sepa', dateString, '#' + orderNumber], order)

  await kv.global.enqueue({
    env,
    type: 'order',
    data: {
      type: 'bank_transfer',
      createdAt: order.createdAt,
    },
  })

  return orderNumber
}

export async function savePaypalOrder(
  cartId: string,
  token: string,
  paymentDetails: unknown,
): Promise<string> {
  console.log(
    'saveOrderWithPayPal - Received cartId:',
    cartId,
    'Type:',
    typeof cartId,
  )

  if (typeof cartId !== 'string') {
    throw new Error(
      `Invalid cartId: Expected a string but received ${typeof cartId}`,
    )
  }

  const orderNumber = generateOrderNumber(cartId)
  const order = {
    cartId,
    orderNumber,
    token,
    paymentDetails,
    createdAt: new Date().toISOString(),
    status: 'completed',
  }
  await kv.german
    .set(
      [site, env, 'orders', 'paypal', dateString, '#' + orderNumber],
      order,
    )

  await kv.global.enqueue({
    env,
    type: 'order',
    data: {
      type: 'paypal',
      createdAt: order.createdAt,
    },
  })

  return orderNumber
}
