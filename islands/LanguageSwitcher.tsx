// islands/LanguageSwitcher.tsx
import { useSignal } from '@preact/signals'
import { LanguageCode, languages } from '@/translations.ts'
import { useEffect, useRef } from 'preact/hooks'

export function LanguageSwitcher() {
  const isOpen = useSignal(false)
  const selectedLanguage = useSignal<LanguageCode>('en')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }

  const selectLanguage = (language: LanguageCode) => {
    selectedLanguage.value = language
    isOpen.value = false
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        isOpen.value = false
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} class='relative lg:flex items-center cursor-pointer'>
      {/* Language Selector */}
      <div class='flex items-center' onClick={toggleMenu}>
        <span>
          {languages.find((lang) =>
            lang.code === selectedLanguage.value
          )?.name}
        </span>
        <svg class='ml-1 w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M5.25 7.25L10 12l4.75-4.75-1.5-1.5L10 9l-3.25-3.25-1.5 1.5z' />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen.value && (
        <div class='absolute top-full mt-2 bg-gray-800 text-white shadow-lg rounded-lg w-40 z-10'>
          <ul>
            {languages.map((lang) => (
              <li
                key={lang.code}
                class={`cursor-pointer py-1 px-4 hover:bg-gray-700 rounded flex items-center ${
                  selectedLanguage.value === lang.code ? 'font-bold' : ''
                }`}
                onClick={() => selectLanguage(lang.code)}
                style={{ paddingLeft: '1.5rem' }} // Ensure space for checkmark
              >
                <span class='w-4 mr-2 flex-shrink-0'>
                  {selectedLanguage.value === lang.code && (
                    <svg
                      class='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z' />
                    </svg>
                  )}
                </span>
                <span>{lang.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
