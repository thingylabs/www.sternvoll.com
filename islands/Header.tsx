// islands/Header.tsx
import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import {
  Menu,
  translationKeys as sidebarMenuTranslationKeys,
} from '@/islands/HeaderSidebarMenu.tsx'
import { InlineMenu } from '@/components/HeaderInlineMenu.tsx'
import {
  Cart,
  translationKeys as inlineCartTranslationKeys,
} from '@/islands/Cart.tsx'
import { LanguageSwitcher } from '@/islands/LanguageSwitcher.tsx'
import { LanguageCode, TranslationMap } from '@/translations.ts'
import type { CountryCode } from '@/config/locales.ts'
import { CountrySelector } from '@/islands/CountrySelector.tsx'

interface HeaderProps {
  forceBackground?: boolean
  t: T
  isEuIp: boolean
  lang: LanguageCode
  country: CountryCode
}

export const translationKeys = [
  ...inlineCartTranslationKeys,
  ...sidebarMenuTranslationKeys,
] as const

export type T = Pick<TranslationMap, typeof translationKeys[number]>

export function Header(
  { forceBackground = false, t, lang, country, isEuIp }: HeaderProps,
) {
  const hasBackground = useSignal(forceBackground)
  const isVisible = useSignal(false)
  const lastScrollTop = useSignal(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = globalThis.scrollY
      hasBackground.value = forceBackground ||
        scrollTop > globalThis.innerHeight * 0.95
      isVisible.value = scrollTop < lastScrollTop.value || scrollTop < 100
      lastScrollTop.value = scrollTop
    }
    handleScroll()
    globalThis.addEventListener('scroll', handleScroll)
    return () => globalThis.removeEventListener('scroll', handleScroll)
  }, [forceBackground])

  useEffect(() => {
    isVisible.value = true
  }, [])

  return (
    <div class='h-[12vw] min-h-[72px]'>
      <header
        class={`fixed top-0 left-0 w-full z-20 p-4 2xl:p-[1vw] transition-all duration-500 ${
          hasBackground.value
            ? 'bg-primary text-primary'
            : 'bg-transparent text-white'
        } transform ${
          isVisible.value
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        } lg:text-white`}
      >
        <div class='flex items-center justify-between'>
          {/* Left Container: Drawer Menu Button */}
          <div class='flex items-center space-x-4 flex-none'>
            <div class='lg:hidden'>
              <Menu
                transparentButton={!hasBackground.value}
                lang={lang}
                country={country}
                t={t}
              />
            </div>
            <div class='hidden lg:block w-10'></div>
          </div>

          {/* Centered Logo - Absolute Center */}
          <a
            href='/'
            class='absolute left-1/2 transform -translate-x-1/2'
          >
            <img
              class='object-scale-down h-10 lg:h-[2.75vw] 2xl:h-[2.5vw] 2xl:my-[1vw]'
              src='/Sternvoll-bright.png'
              alt='Sternvoll'
            />
          </a>

          {/* Right Container: Language Switcher, User Icon, Cart */}
          <div class='flex items-center space-x-4 flex-none z-10'>
            <div class='hidden lg:inline-flex flex-col items-end text-right'>
              <CountrySelector country={country} />
              <LanguageSwitcher lang={lang} />
            </div>
            <div class='hidden lg:inline'>
              <a href='https://account.sternvoll.com/'>
                <svg
                  width='30'
                  height='30'
                  class='2xl:w-[2vw] 2xl:h-[2vw]'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    cx='12'
                    cy='8'
                    r='4'
                    stroke='white'
                    stroke-width='1'
                  />
                  <path
                    d='M4 20c0-4 4-6 8-6s8 2 8 6'
                    stroke='white'
                    stroke-width='1'
                    stroke-linecap='round'
                  />
                </svg>
              </a>
            </div>
            <Cart
              transparentButton={!hasBackground.value}
              t={t}
              isEuIp={isEuIp}
              lang={lang}
              country={country}
            />
          </div>
        </div>

        {/* Inline Navigation Links for large screens */}
        <InlineMenu />
      </header>
    </div>
  )
}
