// islands/LocaleDrawer.tsx
import { useSignal } from '@preact/signals'
import { forwardRef } from 'preact/compat'
import { CountryCode, Locale } from '@/config/locales.ts'
import { setCartLocale } from '@/utils/data.ts'
import useSWR from 'swr'
import { useEffect } from 'preact/hooks'
import type { Ref } from 'preact'
import { COOKIE_KEYS } from '@/utils/cookieKeys.ts'

interface LocaleDrawerProps {
  locale: Locale
  onClose: () => void
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const LocaleDrawer = forwardRef<HTMLDialogElement, LocaleDrawerProps>(
  function LocaleDrawer({ onClose, locale }, ref: Ref<HTMLDialogElement>) {
    const searchTerm = useSignal('')
    const isOpen = useSignal(false)

    const { data: locales, error } = useSWR<Locale[]>(
      isOpen.value ? '/api/locales' : null,
      fetcher,
    )

    useEffect(() => {
      const dialog = typeof ref === 'function' ? null : ref?.current
      if (!dialog) return

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'open') {
            isOpen.value = dialog.hasAttribute('open')
            if (!dialog.hasAttribute('open')) {
              searchTerm.value = ''
            }
          }
        })
      })

      observer.observe(dialog, { attributes: true })
      return () => observer.disconnect()
    }, [])

    const handleCountrySelect = (code: CountryCode) => {
      setCartLocale(code)
      document.cookie = `${COOKIE_KEYS.COUNTRY}=${code}; path=/; max-age=${
        365 * 24 * 60 * 60
      }; secure; samesite=Lax`
      globalThis.location.reload()
    }

    const filteredLocales =
      locales?.filter((locale) =>
        locale.country.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        locale.currency.code.toLowerCase().includes(
          searchTerm.value.toLowerCase(),
        ) ||
        locale.currency.symbol.toLowerCase().includes(
          searchTerm.value.toLowerCase(),
        )
      ) ?? [locale]

    return (
      <dialog
        ref={ref}
        class='bg-transparent p-0 m-0 pt-[50%] sm:pt-0 sm:pr-[40%] md:pr-[50%] w-full h-full max-w-full max-h-full transition-transform duration-500 sm:translate-x-0 translate-y-0 backdrop-blur'
        onClick={(e) => {
          if ((e.target as HTMLDialogElement).tagName === 'DIALOG') onClose()
        }}
      >
        <div class='bg-white rounded-t-lg shadow-xl w-full max-w-md mx-auto flex flex-col h-full'>
          <div class='flex items-center p-4'>
            <input
              type='text'
              placeholder='Search'
              class='w-full border p-2 rounded'
              value={searchTerm.value}
              onInput={(e) =>
                searchTerm.value = (e.target as HTMLInputElement).value}
            />
            <button onClick={onClose} class='ml-2 text-gray-400'>
              <svg class='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
              </svg>
            </button>
          </div>

          <div class='flex-1 overflow-y-auto'>
            <div class='px-4'>
              {error
                ? (
                  <div class='text-red-500 p-4'>
                    Error loading countries. Please try again later.
                  </div>
                )
                : isOpen.value && !locales
                ? (
                  <div class='flex justify-center p-4'>
                    <div class='w-6 h-6 border-2 border-gray-600 border-t-white rounded-full animate-spin' />
                  </div>
                )
                : (
                  <ul class='space-y-1'>
                    {filteredLocales.map((locale) => (
                      <li
                        key={locale.code}
                        class='flex justify-between cursor-pointer p-2 rounded hover:bg-gray-100'
                        onClick={() =>
                          handleCountrySelect(locale.code as CountryCode)}
                      >
                        <span>{locale.country}</span>
                        <span>
                          <span>{locale.currency.code}</span>
                          <span class='ml-1'>{locale.currency.symbol}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </div>
      </dialog>
    )
  },
)
