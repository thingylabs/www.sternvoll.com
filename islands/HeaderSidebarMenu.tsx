import { useEffect, useRef, useState } from 'preact/hooks'
import { menuItems } from '@/config/headerMenu.ts'
import { meta } from '@/config/meta.ts'
import { Social } from '@/components/Social.tsx'
import { locales } from '@/config/locales.ts'

interface MenuProps {
  transparentButton?: boolean
}

export function Menu({ transparentButton = false }: MenuProps) {
  const menuRef = useRef<HTMLDialogElement | null>(null)
  const localeRef = useRef<HTMLDialogElement | null>(null)

  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      menuRef.current?.close()
    }
  }

  const onLocaleSelectorDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      localeRef.current?.close()
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (globalThis.innerWidth >= 1024 && menuRef.current?.open) {
        menuRef.current.close()
      }
    }

    globalThis.addEventListener('resize', handleResize)
    return () => {
      globalThis.removeEventListener('resize', handleResize)
    }
  }, [])

  const openLocaleSelector = () => {
    localeRef.current?.showModal()
  }

  const closeLocaleSelector = () => {
    localeRef.current?.close()
  }

  return (
    <div>
      <button
        type='button'
        onClick={() => menuRef.current?.showModal()}
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
        ref={menuRef}
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
          onOpenLocaleSelector={openLocaleSelector}
          onClose={() => menuRef.current?.close()}
        />
      </dialog>

      {/* Locale Selector Dialog */}
      <dialog
        ref={localeRef}
        class='
    bg-transparent p-0 m-0 pt-[50%]
    sm:pt-0 sm:pr-[40%] md:pr-[50%]
    w-full h-full max-w-full max-h-full
    transition-transform duration-500
    sm:translate-x-0 translate-y-0 backdrop-blur
  '
        onClick={onLocaleSelectorDialogClick}
      >
        <LocaleDrawer
          closeLocaleSelector={closeLocaleSelector}
        />
      </dialog>
    </div>
  )
}

function LocaleDrawer({
  closeLocaleSelector,
}: {
  closeLocaleSelector: () => void
}) {
  return (
    <div class='bg-white rounded-t-lg shadow-xl w-full max-w-md mx-auto flex flex-col h-full'>
      <div class='flex items-center p-4'>
        <input
          type='text'
          placeholder='Search'
          class='w-full border p-2 rounded'
        />
        <button onClick={closeLocaleSelector} class='ml-2 text-gray-400'>
          <svg
            class='w-5 h-5 fill-current'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          </svg>
        </button>
      </div>

      {/* Scrollable Country and Currency List */}
      <div class='flex-1 overflow-y-auto'>
        <div class='px-4'>
          {/* Add padding only here */}
          <ul class='space-y-1'>
            {locales.map((locale, index) => (
              <li key={index} className='flex justify-between'>
                <span>{locale.country}</span>
                <span>
                  <span>{locale.currency.code}</span>
                  <span class='ml-1'>{locale.currency.symbol}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function MenuDrawer({
  onOpenLocaleSelector,
  onClose,
}: {
  onOpenLocaleSelector: () => void
  onClose: () => void
}) {
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false)
  const languageSelectorRef = useRef<HTMLDivElement | null>(null)

  // Handle clicking outside of the language selector to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target as Node)
      ) {
        setIsLanguageSelectorOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleLanguageSelector = () => {
    setIsLanguageSelectorOpen((prev) => !prev)
  }

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
          <a class='text-gray-600' href='https://account.sternvoll.com/'>
            Log in
          </a>
          {/* Locale Selector */}
          <div
            class='text-gray-600 cursor-pointer flex items-center'
            onClick={onOpenLocaleSelector}
          >
            United States | USD $
            <span class='ml-2'>▾</span>
          </div>
          {/* Language Selector */}
          <div
            class='text-gray-600 cursor-pointer flex items-center relative'
            onClick={toggleLanguageSelector}
          >
            English
            <span class='ml-2'>▾</span>
            {isLanguageSelectorOpen && (
              <div
                ref={languageSelectorRef}
                class='absolute bottom-full mb-2 bg-white border rounded shadow-lg p-2 z-10'
              >
                <div class='py-1'>English</div>
                <div class='py-1'>Deutsch</div>
              </div>
            )}
          </div>
        </div>
        <div class='mt-6'>
          <Social />
        </div>
      </div>
    </div>
  )
}
