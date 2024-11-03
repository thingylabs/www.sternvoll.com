import { useEffect, useRef } from 'preact/hooks'
import { menuItems } from '@/config/headerMenu.ts'
import { meta } from '@/config/meta.ts'
import { Social } from '@/components/Social.tsx'

interface MenuProps {
  transparentButton?: boolean
}

export function Menu({ transparentButton = false }: MenuProps) {
  const ref = useRef<HTMLDialogElement | null>(null)
  const languageSelectorRef = useRef<HTMLDialogElement | null>(null)

  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      ref.current?.close()
    }
  }

  const onLanguageSelectorDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      languageSelectorRef.current?.close()
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (globalThis.innerWidth >= 1024 && ref.current?.open) {
        ref.current.close()
      }
    }

    globalThis.addEventListener('resize', handleResize)
    return () => {
      globalThis.removeEventListener('resize', handleResize)
    }
  }, [])

  const openLanguageSelector = () => {
    languageSelectorRef.current?.showModal()
  }

  const closeLanguageSelector = () => {
    languageSelectorRef.current?.close()
  }

  return (
    <div>
      <button
        type='button'
        onClick={() => ref.current?.showModal()}
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

      {/* Sidebar Dialog */}
      <dialog
        ref={ref}
        class='
          bg-transparent p-0 m-0 pt-[50%]
          sm:pt-0 sm:pr-[40%] md:pr-[50%]
          w-full max-w-full max-h-full h-full
          transition-transform duration-500
          sm:translate-x-0 translate-y-0 backdrop-blur
        '
        onClick={onDialogClick}
      >
        <MenuDrawer
          onOpenLanguageSelector={openLanguageSelector}
          onClose={() => ref.current?.close()}
        />
      </dialog>

      {/* Language Selector Dialog with Full-Screen Blur Effect */}
      <dialog
        ref={languageSelectorRef}
        class='
          bg-transparent p-0 m-0 w-full h-full
          max-w-full max-h-full transition-transform
          duration-500 backdrop-blur
        '
        onClick={onLanguageSelectorDialogClick}
      >
        <div class='fixed bottom-0 bg-white rounded-t-lg p-4 shadow-xl w-full max-w-md mx-auto'>
          <div class='flex items-center'>
            <input
              type='text'
              placeholder='Search'
              class='w-full border p-2 rounded mb-2'
            />
            <button
              onClick={closeLanguageSelector}
              class='ml-2 text-gray-400'
            >
              <svg
                class='w-5 h-5 fill-current'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
              </svg>
            </button>
          </div>

          {/* Country and Currency List */}
          <ul class='space-y-1'>
            <li>Afghanistan - AFN ؋</li>
            <li>Åland Islands - EUR €</li>
            <li>Albania - ALL L</li>
            <li>Algeria - DZD د.ج</li>
            {/* Add more countries as needed */}
          </ul>
        </div>
      </dialog>
    </div>
  )
}

function MenuDrawer({
  onOpenLanguageSelector,
  onClose,
}: {
  onOpenLanguageSelector: () => void
  onClose: () => void
}) {
  return (
    <div class='py-8 pt-6 px-6 h-full bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-none sm:rounded-br-2xl flex flex-col overflow-y-auto relative'>
      <div class='flex justify-between pb-4 border-b border-gray-200'>
        <img src={`/${meta.logos.default}`} class='w-[80%] object-scale-down' />
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

      {/* Footer Section */}
      <div class='mt-8 border-t border-gray-200 pt-4'>
        <div class='space-y-2'>
          <button class='text-gray-600'>Log in</button>
          <div
            class='text-gray-600 cursor-pointer flex items-center'
            onClick={onOpenLanguageSelector}
          >
            United States | USD $
            <span class='ml-2'>▾</span>
          </div>
          <div class='text-gray-600'>English</div>
        </div>
        <div class='mt-6'>
          <Social />
        </div>
      </div>
    </div>
  )
}
