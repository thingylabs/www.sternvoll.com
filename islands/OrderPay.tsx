// islands/OrderPay.tsx
import { useEffect, useState } from 'preact/hooks'
import { useCart } from '@/utils/data.ts'
import { generateOrderNumber } from '@/utils/generateOrderNumber.ts'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { CHECKOUT_SESSION_KEY } from '@/utils/types.ts'
import { TranslationMap } from '@/translations.ts'

export const translationKeys = [
  'Review Your Order',
  'Confirm Bank Transfer',
  'Send PayPal Payment',
] as const

export function OrderPay(
  { children, t }: { children: JSX.Element; t: TranslationMap },
) {
  const { data: cart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'paypal'>('bank')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (IS_BROWSER) {
      const urlParams = new URLSearchParams(globalThis.location.search)
      const token = urlParams.get('token')

      if (token) {
        setPaymentMethod('paypal')
      }
    }
  }, [])

  const handleBankTransfer = async () => {
    if (!IS_BROWSER || !cart) return

    const formData = globalThis.sessionStorage.getItem(CHECKOUT_SESSION_KEY)
    if (!formData) {
      setError('Missing checkout session data.')
      return
    }

    const parsedFormData = JSON.parse(formData)

    const { email } = parsedFormData
    const amount = cart.estimatedCost.totalAmount.amount

    // Calculate the due date (7 days from now)
    const deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)
    const dueDate = deadline.toLocaleDateString('de-DE')

    const bankTransferData = {
      cartId: cart.id,
      formData: { email, amount, dueDate },
    }

    try {
      const response = await fetch('/api/orders/bank-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankTransferData),
      })

      if (response.ok) {
        // Redirect to the bank transfer confirmation page
        globalThis.location.href = '/checkout/confirmation/bank-transfer'
      } else {
        throw new Error('Bank transfer confirmation failed.')
      }
    } catch (error) {
      console.error('Error confirming bank transfer:', error)
      setError('An error occurred while processing your bank transfer.')
    }
  }

  const handlePayPalCapture = async () => {
    if (!IS_BROWSER || !cart) return

    const token = new URLSearchParams(globalThis.location.search).get('token')
    if (!token) {
      setError('Missing PayPal token.')
      return
    }

    try {
      const response = await fetch('/api/paypal/capture-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        // Redirect to the PayPal confirmation page
        globalThis.location.href = '/checkout/confirmation/paypal'
      } else {
        throw new Error('PayPal payment capture failed.')
      }
    } catch (error) {
      console.error('Error capturing PayPal payment:', error)
      setError('An error occurred while capturing your PayPal payment.')
    }
  }

  if (!cart) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div class='text-center mb-8'>
        <h1 class='text-2xl font-bold text-gray-900 mb-2'>
          {t['Review Your Order']}
        </h1>
        <p class='text-gray-600'>Order #{generateOrderNumber(cart.id)}</p>
      </div>

      {children}

      {error && <div class='text-red-500'>{error}</div>}

      <div class='flex justify-center mt-8'>
        {paymentMethod === 'bank'
          ? (
            <button
              onClick={handleBankTransfer}
              class='bg-secondary text-white px-12 py-3 rounded hover:bg-secondary-light transition-colors'
            >
              {t['Confirm Bank Transfer']}
            </button>
          )
          : (
            <button
              onClick={handlePayPalCapture}
              class='bg-blue-600 text-white px-12 py-3 rounded hover:bg-blue-700 transition-colors'
            >
              {t['Send PayPal Payment']}
            </button>
          )}
      </div>
    </>
  )
}
