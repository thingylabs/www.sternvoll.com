import { useRef } from 'preact/hooks'
import {
  CartData,
  formatCurrency,
  removeFromCart,
  useCart,
} from '@/utils/data.ts'
import { TranslationMap } from '@/translations.ts'

export type T = Pick<
  TranslationMap,
  | 'Shopping Cart'
  | 'Open cart'
>

declare global {
  interface HTMLDialogElement {
    showModal(): void
    close(): void
  }
}

export function Cart(
  {
    transparentButton = false,
    t,
  }: {
    transparentButton?: boolean
    t: T
  },
) {
  const { data, error } = useCart()
  const ref = useRef<HTMLDialogElement | null>(null)

  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      ref.current!.close()
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <button
        onClick={() => ref.current!.showModal()}
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
        ref={ref}
        class='bg-transparent p-0 m-0 pt-[50%] sm:pt-0 max-w-full sm:pl-[40%] md:pl-[60%] w-full max-h-full h-full transition-transform duration-500 sm:translate-x-0 translate-y-0 backdrop-blur'
        onClick={onDialogClick}
      >
        <CartInner cart={data} t={t} />
      </dialog>
    </div>
  )
}

function CartInner(
  props: { cart: CartData | undefined; t: T },
) {
  const t = props.t
  const { data: cart } = useCart()
  const checkout = (e: Event) => {
    e.preventDefault()
    if (cart) {
      location.href = cart.checkoutUrl
    }
  }

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
            Shipping and taxes calculated at checkout.
          </p>
          <div class='mt-6'>
            <button
              type='button'
              class='w-full bg-gray-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700'
              disabled={props.cart.lines.nodes.length === 0}
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
          <div class='mt-6 flex justify-center text-center text-sm text-gray-500'>
            <p>
              or&nbsp;
              <button
                type='button'
                class='font-medium text-indigo-600 hover:text-indigo-500'
                onClick={(e) => {
                  ;(e.target as HTMLButtonElement).closest('dialog')!.close()
                }}
              >
                Continue Shopping <span aria-hidden='true'>&rarr;</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
