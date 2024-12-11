// islands/OrderReview.tsx
import { IS_BROWSER } from '$fresh/runtime.ts'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import { useCart } from '@/utils/data.ts'
import { formatCurrency } from '@/utils/data.ts'
import { CHECKOUT_SESSION_KEY } from '@/utils/types.ts'
import { TranslationMap } from '@/translations.ts'
import { generateOrderNumber } from '@/utils/generateOrderNumber.ts'
import type { meta } from '@/config/meta.ts'

export const translationKeys = [
  'Quantity',
  'Delivery Address',
  'Name',
  'Email',
  'Phone',
  'Address',
  'City',
  'Postal Code',
  'Country',
  'Total',
  'Bank',
  'Bank Transfer Details',
  'Please transfer the total amount to the following bank account',
  'Account holder',
  'IBAN',
  'BIC',
  'Reference',
  'This will be shown again on the next screen.',
  'PayPal Details',
  'Payer',
  'Shipping Address',
  'Privacy-Focused Checkout',
  'Your shipping address will only be used for delivery',
  'No account creation required',
  'No payment details stored',
] as const

// Define types for PayPal details
interface PayPalPayer {
  email: string
  name: {
    given_name: string
    surname: string
  }
}

interface PayPalShippingAddress {
  address_line_1: string
  admin_area_2: string // City
  postal_code: string
  country_code: string
}

interface PayPalDetails {
  payer: PayPalPayer
  shippingAddress: PayPalShippingAddress
}

export function OrderReview(
  { t, sepa }: { t: TranslationMap; sepa: typeof meta.sepa },
) {
  const { data: cart } = useCart()
  const formData = IS_BROWSER
    ? JSON.parse(
      globalThis.sessionStorage.getItem(CHECKOUT_SESSION_KEY) || 'null',
    )
    : null

  const paymentMethod = useSignal<'bank' | 'paypal'>('bank')
  const paypalDetails = useSignal<PayPalDetails | null>(null)
  const error = useSignal<string | null>(null)
  const isLoading = useSignal(false)

  useEffect(() => {
    if (IS_BROWSER) {
      const urlParams = new URLSearchParams(globalThis.location.search)
      const token = urlParams.get('token')

      if (token) {
        paymentMethod.value = 'paypal'
        isLoading.value = true // Start loading

        // Fetch PayPal order details
        fetch(`/api/paypal/confirm-payment?token=${token}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch PayPal order details.')
            }
            return res.json()
          })
          .then((data: PayPalDetails) => {
            paypalDetails.value = data
            error.value = null // Reset error state
          })
          .catch((err) => {
            console.error('Error fetching PayPal order details:', err)
            error.value = 'Unable to retrieve PayPal order details.'
            paypalDetails.value = null // Reset PayPal details state
          })
          .finally(() => {
            isLoading.value = false // Stop loading
          })
      }
    }
  }, []) // Empty dependency array ensures this runs only once on mount.

  if (isLoading.value || (!formData && !paypalDetails.value)) {
    return <div>Loading...</div>
  }

  return (
    <div class='space-y-8'>
      {/* Order Items */}
      <div class='space-y-4 mb-6'>
        {cart?.lines.nodes.map((line) => (
          <div
            key={line.id}
            class='flex justify-between items-center py-2 border-b border-gray-100 last:border-0'
          >
            <div>
              <p class='font-medium'>{line.merchandise.product.title}</p>
              <p class='text-sm text-gray-600'>
                Model: {line.merchandise.title}
              </p>
              <p class='text-sm text-gray-600'>
                {t['Quantity']}: {line.quantity}
              </p>
            </div>
            <div class='text-right'>
              <p class='font-medium'>
                {formatCurrency(line.estimatedCost.totalAmount)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Address */}
      {formData && (
        <div class='border-t pt-6'>
          <h2 class='text-lg font-semibold mb-4'>{t['Delivery Address']}</h2>
          <div class='grid grid-cols-2 gap-4'>
            <div>
              <p class='text-sm text-gray-600'>{t['Name']}</p>
              <p class='font-medium'>
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            {formData.email && (
              <div>
                <p class='text-sm text-gray-600'>{t['Email']}</p>
                <p class='font-medium'>{formData.email}</p>
              </div>
            )}
            {formData.phone && (
              <div>
                <p class='text-sm text-gray-600'>{t['Phone']}</p>
                <p class='font-medium'>{formData.phone}</p>
              </div>
            )}
            <div class='col-span-2'>
              <p class='text-sm text-gray-600'>{t['Address']}</p>
              <p class='font-medium'>{formData.address}</p>
            </div>
            <div>
              <p class='text-sm text-gray-600'>{t['City']}</p>
              <p class='font-medium'>{formData.city}</p>
            </div>
            <div>
              <p class='text-sm text-gray-600'>{t['Postal Code']}</p>
              <p class='font-medium'>{formData.postalCode}</p>
            </div>
            <div class='col-span-2'>
              <p class='text-sm text-gray-600'>{t['Country']}</p>
              <p class='font-medium'>{formData.country}</p>
            </div>
          </div>
        </div>
      )}

      {/* Totals */}
      {cart && (
        <div class='space-y-2 border-t pt-4'>
          <div class='flex justify-between text-gray-600'>
            <span>{t['Total']}</span>
            <span>{formatCurrency(cart.estimatedCost.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Payment-Specific Information */}
      {paymentMethod.value === 'bank'
        ? (
          <div class='bg-gray-50 p-4 rounded'>
            <h2 class='text-lg font-semibold mb-4'>
              {t['Bank Transfer Details']}
            </h2>
            <p class='text-sm text-gray-600'>
              {t[
                'Please transfer the total amount to the following bank account'
              ]}:
            </p>
            <ul class='text-sm text-gray-600 mt-2'>
              <li>{t['Account holder']}: {sepa.holder}</li>
              <li>{t['Bank']}: {sepa.bank}</li>
              <li>{t['IBAN']}: {sepa.iban}</li>
              <li>{t['BIC']}: {sepa.bic}</li>
              <li>{t['Reference']}: {generateOrderNumber(cart!.id)}</li>
            </ul>
            <p class='text-sm text-gray-600 mt-2'>
              {t['This will be shown again on the next screen.']}
            </p>
          </div>
        )
        : paymentMethod.value === 'paypal' && error.value
        ? <div class='text-red-500'>{error.value}</div>
        : paymentMethod.value === 'paypal' && paypalDetails.value
        ? (
          <div class='bg-gray-50 p-4 rounded'>
            <h2 class='text-lg font-semibold mb-4'>{t['PayPal Details']}</h2>
            <p>
              <strong>{t['Payer']}:</strong>{' '}
              {paypalDetails.value.payer.name.given_name}{' '}
              {paypalDetails.value.payer.name.surname}{' '}
              ({paypalDetails.value.payer.email})
            </p>
            <p>
              <strong>{t['Shipping Address']}:</strong>{' '}
              {paypalDetails.value.shippingAddress.address_line_1},{' '}
              {paypalDetails.value.shippingAddress.admin_area_2},{' '}
              {paypalDetails.value.shippingAddress.postal_code},{' '}
              {paypalDetails.value.shippingAddress.country_code}
            </p>
          </div>
        )
        : null}

      {/* Privacy Info */}
      <div class='bg-gray-50 p-10 rounded'>
        <div class='flex gap-3'>
          <svg
            class='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
          </svg>
          <div class='text-sm text-gray-600'>
            <p class='font-medium text-gray-900 mb-1'>
              {t['Privacy-Focused Checkout']}
            </p>
            <ul class='space-y-1'>
              <li>
                {t['Your shipping address will only be used for delivery']}
              </li>
              <li>{t['No account creation required']}</li>
              <li>{t['No payment details stored']}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
