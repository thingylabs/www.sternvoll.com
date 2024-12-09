// islands/JoinWaitlist.tsx
import { useState } from 'preact/hooks'
import { TranslationMap } from '@/translations.ts'

export const translationKeys = [
  "Awesome! You're on the list! 🎉",
  "We'll let you know as soon as it's available!",
  'Be the first to know when this product is back in stock!',
  'By joining the waitlist, you agree that we may contact you via email when this product is available. Your data will be processed in accordance with our',
  'Privacy Policy',
  'Join the Waitlist',
] as const

export function JoinWaitlist(
  { productTitle, t }: { productTitle: string; t: TranslationMap },
) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productTitle }),
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Failed to join the waitlist')
      }
    } catch (_err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div class='bg-gray-100 p-4 rounded-lg shadow-md'>
      {submitted
        ? (
          <div class='text-center space-y-2 py-4'>
            <div class='flex justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
                class='w-12 h-12 text-green-500'
              >
                <path d='M20.285 6.715a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 15.586l9.293-9.293a1 1 0 0 1 1.414 0z' />
              </svg>
            </div>
            <p class='text-green-600 font-bold text-lg'>
              {t["Awesome! You're on the list! 🎉"]}
            </p>
            <p class='text-gray-600'>
              {t["We'll let you know as soon as it's available!"]}
            </p>
          </div>
        )
        : (
          <form onSubmit={handleSubmit} class='space-y-4'>
            <p class='text-gray-700 text-center font-bold'>
              {t['Be the first to know when this product is back in stock!']}
            </p>
            {error && <p class='text-red-600 text-sm'>{error}</p>}
            <input
              type='email'
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder='Enter your email'
              required
              class='w-full p-2 border border-gray-300 rounded'
            />
            <p class='text-xs text-gray-500 italic mt-2 text-center'>
              {t[
                'By joining the waitlist, you agree that we may contact you via email when this product is available. Your data will be processed in accordance with our'
              ]}{' '}
              <a
                href='/policies/privacy-policy-waitlist'
                class='text-blue-600 hover:underline'
                target='_blank'
              >
                {t['Privacy Policy']}
              </a>
              .
            </p>
            <button
              type='submit'
              class='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
            >
              {t['Join the Waitlist']}
            </button>
          </form>
        )}
    </div>
  )
}
