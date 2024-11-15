// islands/HeaderSidebarMenu.tsx
import { useEffect, useRef, useState } from 'preact/hooks'
import { menuItems } from '@/config/headerMenu.ts'
import { meta } from '@/config/meta.ts'
import { Social } from '@/components/Social.tsx'
import { CountryCode, locales } from '@/config/locales.ts'
import { LanguageCode, languages, type TranslationMap } from '@/translations.ts'

export const translationKeys = menuItems.map((category) => category.label)
  .concat([
    'Log in',
  ])

interface MenuProps {
  transparentButton?: boolean
  lang: LanguageCode
  country: CountryCode
  t: TranslationMap
}

export function Menu(
  { transparentButton = false, lang, country, t }: MenuProps,
) {
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
          lang={lang}
          country={country}
          t={t}
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
          country={country}
        />
      </dialog>
    </div>
  )
}

function LocaleDrawer({
  closeLocaleSelector,
}: {
  closeLocaleSelector: () => void
  country: CountryCode
}) {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: Event) => {
    setSearch((e.target as HTMLInputElement).value.toLowerCase())
  }

  const handleCountrySelect = (code: CountryCode) => {
    document.cookie = `country=${code}; path=/;`
    globalThis.location.reload()
  }

  const filteredLocales = locales.filter((locale) =>
    locale.country.toLowerCase().includes(search) ||
    locale.currency.code.toLowerCase().includes(search) ||
    locale.currency.symbol.toLowerCase().includes(search)
  )

  return (
    <div class='bg-white rounded-t-lg shadow-xl w-full max-w-md mx-auto flex flex-col h-full'>
      <div class='flex items-center p-4'>
        <input
          type='text'
          placeholder='Search'
          class='w-full border p-2 rounded'
          value={search}
          onInput={handleSearchChange}
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
          <ul class='space-y-1'>
            {filteredLocales.map((locale) => (
              <li
                key={locale.code}
                class='flex justify-between cursor-pointer p-2 rounded'
                onClick={() => handleCountrySelect(locale.code as CountryCode)}
              >
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
  lang,
  country,
  t,
}: {
  onOpenLocaleSelector: () => void
  onClose: () => void
  lang: LanguageCode
  country: CountryCode
  t: TranslationMap
}) {
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false)
  const languageSelectorRef = useRef<HTMLDivElement | null>(null)
  const languageButtonRef = useRef<HTMLDivElement | null>(null)
  const locale = locales.find((l) => l.code === country)!

  const toggleLanguageSelector = () => {
    setIsLanguageSelectorOpen((prev) => !prev)
  }

  const selectLanguage = (language: LanguageCode) => {
    document.cookie = `lang=${language}; path=/;`
    globalThis.location.reload()
  }

  // Close the dropdown if clicking outside or clicking the toggle area again
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target as Node) &&
        languageButtonRef.current !== event.target
      ) {
        setIsLanguageSelectorOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
        {menuItems.map((category) => (
          <li key={category.label}>
            <a href={category.link} class='hover:underline'>
              {t[category.label]}
            </a>
          </li>
        ))}
      </ul>

      <div class='mt-5 border-t border-gray-200 pt-4'>
        <div class='space-y-2'>
          <a class='text-gray-600' href='https://account.sternvoll.com/'>
            {t['Log in']}
          </a>
          {/* Locale Selector */}
          <div
            class='text-gray-600 cursor-pointer flex items-center'
            onClick={onOpenLocaleSelector}
          >
            {`${locale.country} | ${locale.currency.code} ${locale.currency.symbol}`}

            <span class='ml-2'>▾</span>
          </div>
          {/* Language Selector */}
          <div
            class='text-gray-600 cursor-pointer flex items-center relative'
            ref={languageButtonRef}
            onClick={toggleLanguageSelector}
          >
            {languages.find((l) => l.code === lang)?.name}
            <span class='ml-2'>▾</span>
            {isLanguageSelectorOpen && (
              <div
                ref={languageSelectorRef}
                class='absolute bottom-full mb-2 bg-white border rounded shadow-lg p-2 z-10'
              >
                {languages.map((language) => (
                  <div
                    key={language.code}
                    onClick={() => selectLanguage(language.code)}
                    class={`py-1 cursor-pointer flex items-center ${
                      lang === language.code ? 'font-bold' : ''
                    }`}
                  >
                    <span class='w-4 mr-2 flex-shrink-0'>
                      {lang === language.code && (
                        <svg
                          class='w-4 h-4'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z' />
                        </svg>
                      )}
                    </span>
                    <span>{language.name}</span>
                  </div>
                ))}
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
