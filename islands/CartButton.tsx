// islands/CartButton.tsx
import type { TranslationMap } from '@/translations.ts'

interface CartButtonProps {
  onClick: () => void
  transparentButton: boolean
  itemCount: number
  t: TranslationMap
}

export function CartButton(
  { onClick, transparentButton, itemCount, t }: CartButtonProps,
) {
  return (
    <button
      onClick={onClick}
      type='button'
      class={`relative flex items-center justify-center rounded-md p-2 opacity-75 hover:opacity-100 ${
        transparentButton
          ? 'bg-transparent border border-secondary'
          : 'bg-secondary'
      } lg:bg-transparent lg:border-none lg:p-0`}
    >
      <span class='sr-only'>{t['Open cart']}</span>
      <div class='w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center'>
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
      {itemCount > 0 && (
        <span class='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2'>
          {itemCount}
        </span>
      )}
    </button>
  )
}
