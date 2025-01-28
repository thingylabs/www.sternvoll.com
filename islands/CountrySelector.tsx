// islands/CountrySelector.tsx
import { useSignal } from '@preact/signals'
import { CountryCode, locales } from '@/config/locales.ts'
import { useEffect, useRef } from 'preact/hooks'
import { Locale } from '@/config/locales.ts'
import { setCartLocale } from '@/utils/data.ts'
import { COOKIE_KEYS } from '@/utils/cookieKeys.ts'

interface Props {
  country: CountryCode
}

export function CountrySelector({ country }: Props) {
  const isOpen = useSignal(false)
  const selectedCountry = useSignal(
    locales.find((locale) => locale.code === country)!,
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchTerm = useSignal('')

  const closeMenu = () => {
    isOpen.value = false
  }

  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }

  const selectCountry = (country: Locale) => {
    setCartLocale(country.code)
    selectedCountry.value = country
    closeMenu()
    document.cookie = `${COOKIE_KEYS.COUNTRY}=${country.code}; path=/;`
    globalThis.location.reload()
  }

  const filteredLocales = locales.filter((locale) => {
    const term = searchTerm.value.toLowerCase()
    return (
      locale.country.toLowerCase().includes(term) ||
      locale.code.toLowerCase().includes(term) ||
      locale.currency.code.toLowerCase().includes(term) ||
      locale.currency.symbol.toLowerCase().includes(term)
    )
  })

  useEffect(() => {
    // Focus on the input when the menu opens
    if (isOpen.value && inputRef.current) {
      inputRef.current.focus()
    }

    // Close the dropdown if clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen.value])

  return (
    <div ref={dropdownRef} class='relative lg:flex items-center cursor-pointer'>
      {/* Selected Country and Currency */}
      <div class='flex items-center opacity-75' onClick={toggleMenu}>
        <span>{selectedCountry.value.country}</span>
        <span class='mx-2'>|</span>
        <span>
          {selectedCountry.value.currency.symbol}{' '}
          {selectedCountry.value.currency.code}
        </span>
        <svg class='ml-1 w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M5.25 7.25L10 12l4.75-4.75-1.5-1.5L10 9l-3.25-3.25-1.5 1.5z' />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen.value && (
        <div class='opacity-100 absolute top-full mt-2 bg-gray-800 text-white shadow-lg rounded-lg p-4 w-56 z-10'>
          <div class='flex items-center border-b border-gray-700 pb-2 mb-2'>
            <input
              type='text'
              placeholder='Search'
              ref={inputRef}
              autoFocus
              value={searchTerm.value}
              onInput={(e) =>
                searchTerm.value = e.currentTarget.value} // Update search term
              onClick={(e) =>
                e.stopPropagation()} // Prevents menu from closing on input click
              class='w-full p-2 bg-gray-900 rounded border border-gray-700'
            />
            <svg class='ml-2 w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M12.9 14.32a8 8 0 1 1 1.42-1.42l4.38 4.38-1.42 1.42-4.38-4.38zM8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
            </svg>
          </div>
          <ul class='max-h-60 overflow-y-auto'>
            {filteredLocales.length > 0
              ? (
                filteredLocales.map((locale) => (
                  <li
                    key={locale.code}
                    class='cursor-pointer py-1 px-2 hover:bg-gray-700 rounded flex justify-between'
                    onClick={() => selectCountry(locale)}
                  >
                    <span>{locale.country}</span>
                    <span class='text-gray-400'>
                      {locale.currency.code} {locale.currency.symbol}
                    </span>
                  </li>
                ))
              )
              : <li class='py-1 px-2 text-gray-400'>No results found</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
