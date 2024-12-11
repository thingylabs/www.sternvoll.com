// islands/BackToShopButton.tsx
import { IS_BROWSER } from '$fresh/runtime.ts'
import { CHECKOUT_SESSION_KEY, PAYMENT_METHOD_KEY } from '@/utils/types.ts'

export function BackToShopButton() {
  const handleClick = () => {
    if (IS_BROWSER) {
      sessionStorage.removeItem(CHECKOUT_SESSION_KEY)
      sessionStorage.removeItem(PAYMENT_METHOD_KEY)
    }
  }

  return (
    <a
      href='/'
      onClick={handleClick}
      class='flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-200'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4.65 3.35C4.92 3.08 5.36 3.08 5.64 3.35C5.91 3.62 5.91 4.07 5.64 4.34L2.69 7.28H15.28C15.67 7.28 16 7.6 16 8C16 8.4 15.67 8.72 15.28 8.72H2.69L5.64 11.67C5.91 11.94 5.91 12.38 5.64 12.66C5.36 12.92 4.92 12.92 4.65 12.66L0.35 8.35C0.16 8.16 0.16 7.84 0.35 7.65L4.65 3.35Z'
          fill='currentColor'
        />
      </svg>
      Back to shop
    </a>
  )
}
