// islands/BankDetails.tsx
import { IS_BROWSER } from '$fresh/runtime.ts'
import { formatCurrency, useCart } from '@/utils/data.ts'
import { CHECKOUT_SESSION_KEY, CheckoutFormData } from '@/utils/types.ts'
import { generateOrderNumber } from '@/utils/generateOrderNumber.ts'
import { meta } from '@/config/meta.ts'
import { TranslationMap } from '@/translations.ts'

export const translationKeys = [
  'Bank Transfer Details',
  'Order Date',
  'Due Date',
  'Bank Name',
  'Account Holder',
  'IBAN',
  'Copy IBAN',
  'BIC',
  'Copy BIC',
  'Amount',
  'Reference',
  'Copy Reference',
  'Please complete the transfer by',
  'Orders without received payment after this date will be automatically cancelled.',
  'Print Bank Details',
] as const

export function BankDetails({ t }: { t: TranslationMap }) {
  const { data: cart } = useCart()
  const formData = IS_BROWSER
    ? JSON.parse(sessionStorage.getItem(CHECKOUT_SESSION_KEY) || 'null') as
      | CheckoutFormData
      | null
    : null

  // Redirect if no data
  if (IS_BROWSER && !formData) {
    globalThis.location.href = '/checkout/start'
    return null
  }

  const handlePrint = () => {
    if (!IS_BROWSER) return
    globalThis.print()
  }

  const handleCopy = async (text: string) => {
    if (!IS_BROWSER) return
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const orderDate = new Date().toLocaleDateString('de-DE')
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 7) // 7 days to pay
  const dueDate = deadline.toLocaleDateString('de-DE')

  const cartId = cart && generateOrderNumber(cart.id)

  return (
    <div>
      <div class='bg-gray-50 rounded-lg mb-8'>
        <h2 class='text-lg font-semibold mb-4'>{t['Bank Transfer Details']}</h2>
        <div class='space-y-4'>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['Order Date']}:</div>
            <div class='font-medium'>{orderDate}</div>
          </div>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['Due Date']}:</div>
            <div class='font-medium'>{dueDate}</div>
          </div>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['Bank Name']}:</div>
            <div class='font-medium'>{meta.sepa.bank}</div>
          </div>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['Account Holder']}:</div>
            <div class='font-medium'>{meta.sepa.holder}</div>
          </div>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['IBAN']}:</div>
            <div class='flex items-center justify-between'>
              <span class='font-medium'>{meta.sepa.iban}</span>
              <button
                onClick={() => handleCopy('DE89370400440532013000')}
                class='ml-2 text-blue-600 hover:text-blue-800'
                title={t['Copy IBAN']}
              >
                <svg
                  class='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['BIC']}:</div>
            <div class='flex items-center justify-between'>
              <span class='font-medium'>{meta.sepa.bic}</span>
              <button
                onClick={() => handleCopy('DEUTDEBBXXX')}
                class='ml-2 text-blue-600 hover:text-blue-800'
                title={t['Copy BIC']}
              >
                <svg
                  class='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['Amount']}:</div>
            <div class='font-medium'>
              {cart && formatCurrency(cart.estimatedCost.totalAmount)}
            </div>
          </div>
          <div class='grid grid-cols-2 gap-4'>
            <div class='text-gray-600'>{t['Reference']}:</div>
            <div class='flex items-center justify-between'>
              <span class='font-medium'>{t['Order']} {cartId}</span>
              <button
                onClick={() => handleCopy(cartId!)}
                class='ml-2 text-blue-600 hover:text-blue-800'
                title={t['Copy Reference']}
              >
                <svg
                  class='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Add a note about the payment deadline */}
        <div class='mt-6 text-sm text-gray-600 border-t pt-4'>
          {t['Please complete the transfer by']} {dueDate}. {t[
            'Orders without received payment after this date will be automatically cancelled.'
          ]}
        </div>
      </div>

      {/* Print Button */}
      <div class='flex justify-center'>
        <button
          onClick={handlePrint}
          class='bg-secondary text-white py-3 px-6 rounded hover:bg-secondary-light transition-colors inline-flex items-center'
        >
          <svg
            class='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
            />
          </svg>
          {t['Print Bank Details']}
        </button>
      </div>
    </div>
  )
}
