// islands/MenuDrawer.tsx
import { useSignal } from '@preact/signals'
import { Social } from '@/components/Social.tsx'
import { LanguageCode, languages, type TranslationMap } from '@/translations.ts'
import { menuItems } from '@/config/headerMenu.ts'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import { Locale } from '@/config/locales.ts'
import { COOKIE_KEYS, setCookie } from '@/utils/cookies.ts'

interface MenuDrawerProps {
  onOpenLocaleSelector: () => void
  onClose: () => void
  lang: LanguageCode
  locale: Locale
  t: TranslationMap
}

export function MenuDrawer({
  // onOpenLocaleSelector,
  onClose,
  lang,
  // locale,
  t,
}: MenuDrawerProps) {
  const isLanguageSelectorOpen = useSignal(false)

  const selectLanguage = (language: LanguageCode) => {
    setCookie(COOKIE_KEYS.LANGUAGE, language)
    globalThis.location.reload()
  }

  return (
    <div class='py-8 pt-6 px-6 h-full bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-none sm:rounded-br-2xl flex flex-col overflow-y-auto relative'>
      {/* Header */}
      <div class='flex justify-between pb-4 border-b border-gray-200'>
        <ResponsiveImage
          src='pixelpilot-name-black.png'
          width={276}
          height={25}
          alt='Pixelpilot Name Black'
          class='w-[80%] object-scale-down'
        />
        <button class='py-1' onClick={onClose}>
          <svg
            class='w-6 h-6 fill-current text-gray-400'
            viewBox='0 0 24 24'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <ul class='mt-4 space-y-4 text-gray-900 text-lg'>
        {menuItems.map((category) => (
          <li key={category.label}>
            <a href={category.link} class='hover:underline'>
              {t[category.label]}
            </a>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div class='mt-5 border-t border-gray-200 pt-4'>
        <div class='space-y-2'>
          <a class='text-gray-600' href='https://account.pixelpilot.club/'>
            {t['Log in']}
          </a>

          {
            /*
          <div
            class='text-gray-600 cursor-pointer flex items-center'
            onClick={onOpenLocaleSelector}
          >
            {`${locale.country} | ${locale.currency.code} ${locale.currency.symbol}`}
            <span class='ml-2'>▾</span>
          </div>
          */
          }

          <div class='text-gray-600 cursor-pointer flex items-center relative'>
            <div
              onClick={() =>
                isLanguageSelectorOpen.value = !isLanguageSelectorOpen.value}
              class='flex items-center'
            >
              {languages.find((l) => l.code === lang)?.name}
              <span class='ml-2'>▾</span>
            </div>

            {isLanguageSelectorOpen.value && (
              <div class='absolute bottom-full mb-2 bg-white border rounded shadow-lg p-2 z-10'>
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
