// import Cart from '../islands/Cart.tsx'

export function Header() {
  return (
    <header>
      <div class='bg-primary p-6'>
        <img
          src='/Sternvoll-bright.png'
          alt='Sternvoll'
          class='mx-auto'
        />
      </div>
      <nav class='bg-tertiary flex p-4'>
        <div class='flex-none'>
          <button
            type='button'
            class='relative rounded-md bg-secondary opacity-50 p-2 text-gray-400'
          >
            <span class='sr-only'>Open menu</span>
            <svg
              class='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='black'
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
        <div class='flex-1 ps-4'>
          <div class='relative'>
            <div class='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                class='w-4 h-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              class='block h-10 w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-tertiary focus:border-tertiary'
              placeholder='Search Jewelry...'
              required
            />
            <button
              type='submit'
              class='py-1 text-black absolute end-1.5 top-1.5 bg-secondary opacity-50 focus:ring-4 focus:outline-none focus:ring-tertiary font-medium rounded-lg text-sm px-4'
            >
              Search
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
