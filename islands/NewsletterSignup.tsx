// islands/NewsletterSignup.tsx
import { useState } from 'preact/hooks'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { CHECKOUT_SESSION_KEY } from '@/utils/types.ts'
import { TranslationMap } from '@/translations.ts'

export const translationKeys = [
  'Sign up for our newsletter to receive exclusive offers and updates.',
  'Thank You!',
  'Join Our Newsletter',
  'Exclusive offers',
  'Product updates',
  'Special promotions',
  'By subscribing, you agree to our',
  'Privacy Policy',
  'You can unsubscribe anytime.',
  'Subscribe Now',
  'Thanks for subscribing!',
  'Check your email for updates.',
] as const

export type T = Pick<TranslationMap, typeof translationKeys[number]>

interface Props {
  t: TranslationMap
}

export function NewsletterSignup({ t }: Props) {
  const [submitted, setSubmitted] = useState(false)

  if (!IS_BROWSER) return null

  const formData = JSON.parse(
    sessionStorage.getItem(CHECKOUT_SESSION_KEY) || '{}',
  )

  if (!formData.email) return null

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error('Newsletter subscription failed:', err)
    }
  }

  return (
    <section className='print:hidden bg-gray-100 rounded-lg overflow-hidden relative mb-14'>
      {/* Dashed border */}
      <div className='absolute inset-0 m-1 mt-12 rounded-lg border-2 border-dashed border-secondary'>
      </div>

      <div className='px-4 py-6 relative'>
        {/* Heading */}
        <div className='flex justify-center items-center'>
          <div className='relative inline-block text-center'>
            <div className='
                absolute inset-0
                bg-black
                -skew-x-12
                px-6
                py-2
                h-full
                w-full
              '>
            </div>
            <h3 className='
                relative
                text-2xl
                text-secondary
                font-bold
                px-4
                py-2
                z-10
              '>
              {submitted ? t['Thank You!'] : t['Join Our Newsletter']}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className='mt-6'>
          {!submitted && (
            <form className='space-y-4' onSubmit={handleSubmit}>
              <p className='text-sm text-gray-700'>
                {t[
                  'Sign up for our newsletter to receive exclusive offers and updates.'
                ]}
              </p>
              <ul className='space-y-2 mt-4'>
                <li className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    className='w-6 h-6 text-secondary flex-shrink-0'
                  >
                    <path d='M20.285 6.715a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 15.586l9.293-9.293a1 1 0 0 1 1.414 0z' />
                  </svg>
                  <span className='text-gray-700 leading-normal font-bold'>
                    {t['Exclusive offers']}
                  </span>
                </li>
                <li className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    className='w-6 h-6 text-secondary flex-shrink-0'
                  >
                    <path d='M20.285 6.715a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 15.586l9.293-9.293a1 1 0 0 1 1.414 0z' />
                  </svg>
                  <span className='text-gray-700 leading-normal font-bold'>
                    {t['Product updates']}
                  </span>
                </li>
                <li className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    className='w-6 h-6 text-secondary flex-shrink-0'
                  >
                    <path d='M20.285 6.715a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 15.586l9.293-9.293a1 1 0 0 1 1.414 0z' />
                  </svg>
                  <span className='text-gray-700 leading-normal font-bold'>
                    {t['Special promotions']}
                  </span>
                </li>
              </ul>
              <p className='text-xs text-gray-500'>
                {t['By subscribing, you agree to our']}{' '}
                <a
                  href='/policies/privacy-policy-newsletter'
                  className='text-primary underline'
                >
                  {t['Privacy Policy']}
                </a>. {t['You can unsubscribe anytime.']}
              </p>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50'
              >
                {t['Subscribe Now']}
              </button>
            </form>
          )}

          {submitted && (
            <p className='text-sm text-green-600 mt-4'>
              {t['Thanks for subscribing!']}
              <br />
              {t['Check your email for updates.']}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
