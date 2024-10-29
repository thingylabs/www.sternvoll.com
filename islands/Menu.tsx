import { useRef } from 'preact/hooks'

interface MenuProps {
  transparentButton?: boolean
}

export function Menu({ transparentButton = false }: MenuProps) {
  const ref = useRef<HTMLDialogElement | null>(null)

  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      ref.current!.close()
    }
  }

  return (
    <div>
      <button
        type='button'
        onClick={() => ref.current!.showModal()}
        class={`relative rounded-md p-2 opacity-50 hover:opacity-100 ${
          transparentButton
            ? 'bg-transparent border border-secondary opacity-6'
            : 'bg-secondary'
        }`}
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

      <dialog
        ref={ref}
        class={`
        bg-transparent p-0 m-0 pt-[50%]
        sm:pt-0 sm:pr-[40%] md:pr-[50%]
        w-full max-w-full w-full max-h-full h-full
        transition-transform duration-500
        sm:translate-x-0 translate-y-0 backdrop-blur
        `}
        onClick={onDialogClick}
      >
        <MenuDrawer />
      </dialog>
    </div>
  )
}

function MenuDrawer() {
  return (
    <div class='py-8 pt-6 px-6 h-full bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-none sm:rounded-br-2xl flex flex-col overflow-y-auto'>
      <div class='flex justify-between pb-4 border-b border-gray-200'>
        <img src='Sternvoll-bright.png' class='w-[80%] object-scale-down' />
        <button
          class='py-1'
          onClick={(e) => {
            ;(e.target as HTMLButtonElement).closest('dialog')!.close()
          }}
        >
          <svg
            class='w-6 h-6 fill-current text-gray-400'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          </svg>
        </button>
      </div>

      <ul class='mt-4 space-y-4 text-gray-900 text-lg'>
        <li>Rings</li>
        <li>Earrings</li>
        <li>Necklaces</li>
        <li>Bracelets</li>
        <li>
          Collections
          <ul class='pl-4 mt-2 space-y-2 text-gray-700'>
            <li>Heart-Shaped Jewelry</li>
            <li>Pain-Free Earclips</li>
            <li>Diamond-Finishing</li>
          </ul>
        </li>
        <li>
          Materials
          <ul class='pl-4 mt-2 space-y-2 text-gray-700'>
            <li>18k Gold</li>
            <li>925 Sterling Silver</li>
            <li>Diamonds</li>
            <li>Pearls</li>
          </ul>
        </li>
        <li>
          Price
          <ul class='pl-4 mt-2 space-y-2 text-gray-700'>
            <li>&gt; 1,000 Euro</li>
            <li>&lt; 500 Euro</li>
            <li>&lt; 100 Euro</li>
            <li>&lt; 50 Euro</li>
          </ul>
        </li>
        <li>Engagement & Wedding</li>
        <li>On Sale 🔖</li>
      </ul>
    </div>
  )
}
