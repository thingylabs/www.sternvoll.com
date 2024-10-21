import { Cart } from '../islands/Cart.tsx'

export function Header() {
  return (
    <header class='bg-primary text-primary flex p-4'>
      <div class='flex-none'>
        <button
          type='button'
          class='relative rounded-md bg-secondary p-2 opacity-50 hover:opacity-100'
        >
          <span class='sr-only'>Open menu</span>
          <svg
            class='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            data-slot='icon'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </button>
      </div>

      <div class='flex-1 px-4 flex justify-center'>
        <img
          class='object-scale-down'
          src='/Sternvoll-bright.png'
          alt='Sternvoll'
        />
      </div>

      {/* Cart */}
      <div class='flex-none'>
        <Cart />
      </div>
    </header>
  )
}
