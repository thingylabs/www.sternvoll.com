// components/PrivacyDialog.tsx
import { forwardRef } from 'preact/compat'
import type { TranslationMap } from '@/translations.ts'

interface PrivacyDialogProps {
  t: TranslationMap
  onAccept: () => void
  onDecline: () => void
}

export const PrivacyDialog = forwardRef<HTMLDialogElement, PrivacyDialogProps>(
  function PrivacyDialog({ t, onAccept, onDecline }, ref) {
    return (
      <dialog
        ref={ref}
        class='rounded-2xl max-w-lg w-full p-6 backdrop-blur-md bg-white/80 shadow-lg transition'
      >
        <div class='text-center'>
          <h3 class='text-lg font-semibold'>{t['Checkout Options']}</h3>
          <p class='mt-2 text-sm text-gray-600 text-justify'>
            <strong>{t['Comfort Checkout']}</strong> - {t[
              'For a fast, automated process with modern payment methods (e.g., PayPal, Klarna, Apple Pay). By choosing this checkout option, you agree to additional data processing. Learn more in our exended'
            ]}{' '}
            <a
              href='/policies/privacy-policy-comfort-checkout'
              target='_blank'
              class='text-blue-600 underline'
            >
              {t['Privacy Policy']}
            </a>
          </p>
          <p class='mt-2 text-sm text-gray-600 text-justify'>
            <strong>{t['Manual Checkout']}</strong> - {t[
              'For customers who prefer not to have additional data processing. In this option, payment is made manually, e.g., through a manual PayPal or bank transfer.'
            ]}
          </p>
        </div>

        <div class='mt-6 flex space-x-4'>
          <button
            class='flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 text-lg font-medium'
            onClick={onDecline}
          >
            {t['Manual Checkout']}
          </button>
          <button
            class='flex-1 py-2 rounded-lg bg-blue-600 text-white text-lg font-medium'
            onClick={onAccept}
          >
            {t['Comfort Checkout']}
          </button>
        </div>
      </dialog>
    )
  },
)
