// islands/CartContents.tsx
import { formatCurrency, removeFromCart, useCart } from '@/utils/data.ts'
import type { CartData } from '@/utils/data.ts'
import type { Signal } from '@preact/signals'
import type { TranslationMap } from '@/translations.ts'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'

interface CartContentsProps {
  cart: CartData | undefined
  t: TranslationMap
  onCheckout: () => void
  isComfortCheckoutEnabled: Signal<boolean>
  onToggleComfortCheckout: () => void
  onClose: () => void
}

export function CartContents({
  cart,
  t,
  onCheckout,
  // isComfortCheckoutEnabled,
  // onToggleComfortCheckout,
  onClose,
}: CartContentsProps) {
  const { data: cartData } = useCart()

  const remove = (itemId: string) => {
    if (cartData) {
      removeFromCart(cartData.id, itemId)
    }
  }

  return (
    <div class='py-8 px-6 h-full bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-tr-none sm:rounded-bl-2xl flex flex-col justify-between overflow-y-auto'>
      <div class='flex justify-between'>
        <h2 class='text-lg font-medium text-gray-900'>{t['Shopping Cart']}</h2>
        <button class='py-1' onClick={onClose}>
          <svg
            class='w-6 h-6 fill-current text-gray-600'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          </svg>
        </button>
      </div>

      {cart && (
        <>
          <div class='flex-grow-1 my-4'>
            {cart.lines.nodes.length === 0
              ? <p class='text-gray-700'>There are no items in the cart.</p>
              : (
                <ul role='list' class='-my-6 divide-y divide-gray-200'>
                  {cart.lines.nodes.map((line) => (
                    <li class='flex py-6' key={line.id}>
                      <div class='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                        <ResponsiveImage
                          src={line.merchandise.image.jpg_tiny!}
                          alt={line.merchandise.image.altText ??
                            line.merchandise.product.title}
                          class='h-full w-full object-cover object-center'
                          height={94}
                          width={94}
                          shopify={{
                            webp: {
                              default: line.merchandise.image.webp_tiny!,
                              '2x': line.merchandise.image.webp_tiny_2x!,
                            },
                            jpg: {
                              default: line.merchandise.image.jpg_tiny!,
                              '2x': line.merchandise.image.jpg_tiny_2x!,
                            },
                          }}
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

          <div class='border-t border-gray-200 py-6 px-4 sm:px-6'>
            <div class='flex justify-between text-lg font-medium'>
              <p>{t['Total']}</p>
              <p>{formatCurrency(cart.estimatedCost.totalAmount)}</p>
            </div>
            <p class='mt-0.5 text-sm text-gray-500'>
              {t['Shipping and taxes calculated at checkout.']}
            </p>

            <div class='mt-6 flex flex-col items-center'>
              {
                /*
              <div class='flex flex-wrap items-center justify-center text-sm text-gray-600 text-center'>
                <input
                  type='checkbox'
                  id='comfortCheckout'
                  class='mr-2'
                  checked={isComfortCheckoutEnabled.value}
                  onChange={onToggleComfortCheckout}
                />
                <label htmlFor='comfortCheckout' class='whitespace-nowrap'>
                  {t['Comfort Checkout']}
                </label>
                <a
                  href='/policies/privacy-policy-comfort-checkout'
                  class='ml-1 inline text-indigo-600 hover:text-indigo-500'
                >
                  ({t['Data privacy']})
                </a>
              </div>
              */
              }

              <button
                type='button'
                class='w-full mt-4 bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900'
                disabled={cart.lines.nodes.length === 0}
                onClick={onCheckout}
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
                  onClick={onClose}
                >
                  {t['Continue Shopping']}
                  <span aria-hidden='true'>→</span>
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
