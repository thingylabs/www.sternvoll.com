// routes/api/orders/bank-transfer.ts
import { Handlers } from '$fresh/server.ts'
import { saveBankOrder } from '@/utils/orders.ts'
import {
  sendSepaPaymentConfirmationToClient,
  sendSepaPaymentConfirmationToSales,
} from '@/utils/emails.ts'

export const handler: Handlers = {
  async POST(req) {
    try {
      const { cartId, formData } = await req.json()

      if (!cartId || !formData) {
        return new Response(JSON.stringify({ error: 'Invalid input' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const orderNumber = await saveBankOrder(cartId, formData)

      const { email, amount, dueDate } = formData

      if (email) {
        // Customer email is an optional field
        await sendSepaPaymentConfirmationToClient({
          to: email,
          orderId: orderNumber,
          amount,
          dueDate,
        })
      }
      await sendSepaPaymentConfirmationToSales({
        orderId: orderNumber,
        amount: { amount, currencyCode: 'EUR' },
      })

      return new Response(JSON.stringify({ success: true, orderNumber }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (e) {
      const error = e as Error
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}
