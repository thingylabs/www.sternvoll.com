// islands/Cart.tsx
import { useEffect, useRef, useState } from 'preact/hooks'
import {
  CartData,
  ensureLocale,
  formatCurrency,
  removeFromCart,
  useCart,
} from '@/utils/data.ts'
import { type LanguageCode, TranslationMap } from '@/translations.ts'
import type { CountryCode } from '@/config/locales.ts'

export const translationKeys = [
  'Shopping Cart',
  'Open cart',
  'Checkout Options',
  'Comfort Checkout',
  'For a fast, automated process with modern payment methods (e.g., PayPal, Klarna, Apple Pay). By choosing this checkout option, you agree to additional data processing. Learn more in our',
  'Privacy Policy',
  'Manual Checkout',
  'For customers who prefer not to have additional data processing. In this option, payment is made manually, e.g., through a manual PayPal or bank transfer.',
  'Data privacy',
  'Checkout',
  'or',
  'Continue Shopping',
  'Shipping and taxes calculated at checkout.',
] as const

export type T = Pick<TranslationMap, typeof translationKeys[number]>

declare global {
  interface HTMLDialogElement {
    showModal(): void
    close(): void
  }
}

export function Cart(
  {
    transparentButton = false,
    isEuIp,
    t,
    lang,
    country,
  }: {
    transparentButton?: boolean
    isEuIp: boolean
    t: T
    lang: LanguageCode
    country: CountryCode
  },
) {
  const { data, error } = useCart(country)

  const cartRef = useRef<HTMLDialogElement | null>(null)
  const privacyRef = useRef<HTMLDialogElement | null>(null)

  const [isComfortCheckoutEnabled, setIsComfortCheckoutEnabled] = useState(
    !isEuIp,
  )
  const [hasUserSetPreference, setHasUserSetPreference] = useState(false)

  useEffect(() => {
    const storedChoice = localStorage.getItem('comfortCheckoutEnabled')
    if (storedChoice !== null) {
      setIsComfortCheckoutEnabled(JSON.parse(storedChoice))
    }
  }, [])

  useEffect(() => {
    if (hasUserSetPreference) {
      localStorage.setItem(
        'comfortCheckoutEnabled',
        JSON.stringify(isComfortCheckoutEnabled),
      )
    }
  }, [isComfortCheckoutEnabled, hasUserSetPreference])

  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      cartRef.current?.close()
    }
  }

  const openPrivacyModal = () => {
    if (isEuIp && !isComfortCheckoutEnabled) {
      privacyRef.current?.showModal()
    } else if (data) {
      const url = new URL(data.checkoutUrl)
      url.searchParams.set('locale', lang)
      location.href = url.toString()
    }
  }

  const acceptPrivacy = () => {
    privacyRef.current?.close()
    setIsComfortCheckoutEnabled(true)
    setHasUserSetPreference(true)
    if (data) {
      const url = new URL(data.checkoutUrl)
      url.searchParams.set('locale', lang)
      location.href = url.toString()
    }
  }

  const declinePrivacy = () => {
    privacyRef.current?.close()
    setIsComfortCheckoutEnabled(false)
    setHasUserSetPreference(true)
  }

  const handleCheckboxToggle = () => {
    setIsComfortCheckoutEnabled((prev) => !prev)
    setHasUserSetPreference(true)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <button
        onClick={() => cartRef.current!.showModal()}
        type='button'
        class={`relative flex items-center justify-center rounded-md p-2 opacity-50 hover:opacity-100 ${
          transparentButton
            ? 'bg-transparent border border-secondary opacity-60'
            : 'bg-secondary'
        } lg:bg-transparent lg:border-none lg:p-0 lg:opacity-100`}
      >
        <span class='sr-only'>{t['Open cart']}</span>
        <div class='w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center 2xl:w-[2vw] 2xl:h-[2vw] 2xl:ml-[1vw]'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            class='w-full h-full'
          >
            <rect
              x='4.5'
              y='6.5'
              width='15'
              height='13'
              rx='2.5'
              stroke='currentColor'
              stroke-width='1'
            />
            <path
              d='M9 6V4C9 2.89543 9.89543 2 11 2H13C14.1046 2 15 2.89543 15 4V6'
              stroke='currentColor'
              stroke-width='1'
              fill='none'
              stroke-linecap='round'
            />
          </svg>
        </div>
        {data && data.lines.nodes.length > 0 && (
          <span class='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2'>
            {data?.lines.nodes.length}
          </span>
        )}
      </button>

      <dialog
        ref={cartRef}
        class='bg-transparent p-0 m-0 pt-[50%] sm:pt-0 max-w-full sm:pl-[40%] md:pl-[60%] w-full max-h-full h-full transition-transform duration-500 sm:translate-x-0 translate-y-0 backdrop-blur'
        onClick={onDialogClick}
      >
        <CartInner
          cart={data}
          t={t}
          country={country}
          onCheckout={openPrivacyModal}
          isComfortCheckoutEnabled={isComfortCheckoutEnabled}
          onToggleComfortCheckout={handleCheckboxToggle}
        />
      </dialog>

      <dialog
        ref={privacyRef}
        class='rounded-2xl max-w-lg w-full p-6 backdrop-blur-md bg-white/80 shadow-lg transition'
      >
        <div class='text-center'>
          <h3 class='text-lg font-semibold'>{t['Checkout Options']}</h3>
          <p class='mt-2 text-sm text-gray-600 text-justify'>
            <strong>{t['Comfort Checkout']}</strong> - {t[
              'For a fast, automated process with modern payment methods (e.g., PayPal, Klarna, Apple Pay). By choosing this checkout option, you agree to additional data processing. Learn more in our'
            ]}{' '}
            <a
              href='/datenschutz'
              target='_blank'
              class='text-blue-600 underline'
            >
              {t['Privacy Policy']}
            </a>.
          </p>
          <p class='mt-2 text-sm text-gray-600 text-justify'>
            <span class='inline-flex space-x-1 font-semibold'>
              {t['Manual Checkout']}
            </span>{' '}
            - {t[
              'For customers who prefer not to have additional data processing. In this option, payment is made manually, e.g., through a manual PayPal or bank transfer.'
            ]}
          </p>
        </div>

        <div class='mt-6 flex space-x-4'>
          <button
            class='flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 text-lg font-medium'
            onClick={declinePrivacy}
          >
            {t['Manual Checkout']}
          </button>
          <button
            class='flex-1 py-2 rounded-lg bg-blue-600 text-white text-lg font-medium'
            onClick={acceptPrivacy}
          >
            {t['Comfort Checkout']}
          </button>
        </div>
      </dialog>
    </div>
  )
}

function CartInner(
  props: {
    cart: CartData | undefined
    t: T
    country: CountryCode
    onCheckout: () => void
    isComfortCheckoutEnabled: boolean
    onToggleComfortCheckout: () => void
  },
) {
  const t = props.t
  const { data: cart } = useCart(props.country)

  const remove = (itemId: string) => {
    if (cart) {
      removeFromCart(cart.id, itemId)
    }
  }

  return (
    <div class='py-8 px-6 h-full bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-tr-none sm:rounded-bl-2xl flex flex-col justify-between overflow-y-auto'>
      <div class='flex justify-between'>
        <h2 class='text-lg font-medium text-gray-900'>
          {t['Shopping Cart']}
        </h2>
        <button
          class='py-1'
          onClick={(e) => {
            ;(e.target as HTMLButtonElement).closest('dialog')!.close()
          }}
        >
          <svg
            class='w-6 h-6 fill-current text-gray-600'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          </svg>
        </button>
      </div>
      {props.cart && (
        <div class='flex-grow-1 my-4'>
          {props.cart.lines.nodes.length === 0
            ? <p class='text-gray-700'>There are no items in the cart.</p>
            : (
              <ul role='list' class='-my-6 divide-y divide-gray-200'>
                {props.cart.lines.nodes.map((line) => (
                  <li class='flex py-6' key={line.id}>
                    <div class='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                      <img
                        src={line.merchandise.image.url}
                        alt={line.merchandise.image.altText ??
                          line.merchandise.product.title}
                        class='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div class='ml-4 flex flex-1 flex-col'>
                      <div>
                        <div class='flex justify-between text-base font-medium text-gray-900'>
                          <h3>{line.merchandise.product.title}</h3>
                          <p class='ml-4'>
                            {formatCurrency(line.estimatedCost.totalAmount)}
                          </p>
                        </div>
                        <p class='mt-1 text-sm text-gray-500'>
                          {line.merchandise.title !==
                              line.merchandise.product.title
                            ? line.merchandise.title
                            : ''}
                        </p>
                      </div>
                      <div class='flex flex-1 items-end justify-between text-sm'>
                        <p class='text-gray-500'>
                          Quantity <strong>{line.quantity}</strong>
                        </p>
                        <div class='flex'>
                          <button
                            type='button'
                            class='font-medium text-indigo-600 hover:text-indigo-500'
                            onClick={() =>
                              remove(line.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
      )}
      {props.cart && (
        <div class='border-t border-gray-200 py-6 px-4 sm:px-6'>
          <div class='flex justify-between text-lg font-medium'>
            <p>Subtotal</p>
            <p>{formatCurrency(props.cart.estimatedCost.totalAmount)}</p>
          </div>
          <p class='mt-0.5 text-sm text-gray-500'>
            {t['Shipping and taxes calculated at checkout.']}
          </p>

          {/* Comfort Checkout Checkbox */}
          <div class='mt-6 flex flex-col items-center'>
            <div class='flex flex-wrap items-center justify-center text-sm text-gray-600 text-center'>
              <input
                type='checkbox'
                id='comfortCheckout'
                class='mr-2'
                checked={props.isComfortCheckoutEnabled}
                onChange={props.onToggleComfortCheckout}
              />
              <label htmlFor='comfortCheckout' class='whitespace-nowrap'>
                {t['Comfort Checkout']}
              </label>
              <a
                href='/policies/privacy-policy-comfort-checkout'
                class='ml-1 block sm:inline w-full sm:w-auto  text-indigo-600 hover:text-indigo-500'
              >
                ({t['Data privacy']})
              </a>
            </div>

            <button
              type='button'
              class='w-full mt-4 bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700'
              disabled={props.cart.lines.nodes.length === 0}
              onClick={props.onCheckout}
            >
              {t['Checkout']}
            </button>
          </div>
          <div class='mt-6 flex justify-center text-center text-sm text-gray-500'>
            <p>
              {t['or']}&nbsp;
              <button
                type='button'
                class='font-medium text-indigo-600 hover:text-indigo-500'
                onClick={(e) => {
                  ;(e.target as HTMLButtonElement).closest('dialog')!.close()
                }}
              >
                {t['Continue Shopping']} <span aria-hidden='true'>&rarr;</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
