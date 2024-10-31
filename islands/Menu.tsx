import { useRef } from 'preact/hooks'

interface MenuProps {
  transparentButton?: boolean
}

type MenuItem = {
  label: string
  link?: string
  items?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    label: 'Jewelry',
    link: '#jewelry',
    items: [
      {
        label: 'All Jewelry',
        link: '#all-jewelry',
        items: [
          { label: 'Rings', link: '#rings' },
          { label: 'Earrings', link: '#earrings' },
          { label: 'Necklaces', link: '#necklaces' },
          { label: 'Bracelets', link: '#bracelets' },
        ],
      },
      {
        label: 'Collections',
        link: '#collections',
        items: [
          { label: 'Heart-Shaped Jewelry', link: '#heart-shaped' },
          { label: 'Pain-Free Earclips', link: '#earclips' },
          { label: 'Diamond-Finishing', link: '#diamond-finishing' },
        ],
      },
      {
        label: 'Materials',
        link: '#materials',
        items: [
          { label: '18k Gold', link: '#18k-gold' },
          { label: '925 Sterling Silver', link: '#sterling-silver' },
          { label: 'Diamonds', link: '#diamonds' },
          { label: 'Pearls', link: '#pearls' },
        ],
      },
      {
        label: 'Price',
        link: '#price',
        items: [
          { label: '> 1,000 Euro', link: '#price-above-1000' },
          { label: '< 500 Euro', link: '#price-below-500' },
          { label: '< 100 Euro', link: '#price-below-100' },
          { label: '< 50 Euro', link: '#price-below-50' },
        ],
      },
    ],
  },
  { label: 'Rings', link: '#rings' },
  { label: 'Earrings', link: '#earrings' },
  { label: 'Necklaces', link: '#necklaces' },
  { label: 'Engagement & Wedding', link: '#engagement-wedding' },
  { label: 'On Sale 🔖', link: '#on-sale' },
]

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
        <MenuDrawer onClose={() => ref.current?.close()} />
      </dialog>
    </div>
  )
}

// Drawer menu for small screens
function MenuDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div class='py-8 pt-6 px-6 h-full bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-none sm:rounded-br-2xl flex flex-col overflow-y-auto'>
      <div class='flex justify-between pb-4 border-b border-gray-200'>
        <img src='Sternvoll-bright.png' class='w-[80%] object-scale-down' />
        <button class='py-1' onClick={onClose}>
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
        {menuItems.map((category) =>
          category.items
            ? (
              <li key={category.label}>
                <a href={category.link} class='hover:underline'>
                  {category.label}
                </a>
                <ul class='pl-4 mt-2 space-y-2 text-gray-700'>
                  {category.items.map((subCategory) =>
                    subCategory.items
                      ? (
                        <li key={subCategory.label}>
                          <a
                            href={subCategory.link}
                            class='font-semibold hover:underline'
                          >
                            {subCategory.label}
                          </a>
                          <ul class='pl-4 mt-2 space-y-2 text-gray-700'>
                            {subCategory.items.map((subItem) => (
                              <li key={subItem.label}>
                                <a href={subItem.link} class='hover:underline'>
                                  {subItem.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                      : (
                        <li key={subCategory.label}>
                          <a href={subCategory.link} class='hover:underline'>
                            {subCategory.label}
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </li>
            )
            : (
              <li key={category.label}>
                <a href={category.link} class='hover:underline'>
                  {category.label}
                </a>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

// Inline menu for large screens
export function InlineMenu() {
  return (
    <div class='hidden lg:flex justify-center space-x-6 mt-2'>
      {menuItems.map((category) =>
        category.items
          ? (
            <div key={category.label} class='group relative'>
              <a
                href={category.link}
                class='text-white hover:text-gray-300 flex items-center'
              >
                {category.label}
                <span class='ml-1'>▾</span> {/* Triangle indicator */}
              </a>
              <div class='absolute left-0 mt-2 hidden group-hover:flex bg-gray-100 text-gray-900 shadow-lg rounded-lg p-4'>
                <ul class='space-y-2 min-w-max'>
                  {category.items.map((subCategory) =>
                    subCategory.items
                      ? (
                        <li key={subCategory.label}>
                          <a
                            href={subCategory.link}
                            class='font-semibold hover:underline'
                          >
                            {subCategory.label}
                          </a>
                          <ul class='mt-1 space-y-1'>
                            {subCategory.items.map((subItem) => (
                              <li key={subItem.label}>
                                <a
                                  href={subItem.link}
                                  class='block px-2 py-1 hover:bg-gray-200'
                                >
                                  {subItem.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                      : (
                        <li key={subCategory.label}>
                          <a
                            href={subCategory.link}
                            class='block px-2 py-1 hover:bg-gray-200'
                          >
                            {subCategory.label}
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
          )
          : (
            <a
              key={category.label}
              href={category.link}
              class='text-white hover:text-gray-300'
            >
              {category.label}
            </a>
          )
      )}
    </div>
  )
}
