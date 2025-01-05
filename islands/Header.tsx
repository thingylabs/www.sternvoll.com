// islands/Header.tsx
import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { IS_BROWSER } from '$fresh/runtime.ts'
import {
  SidebarMenu,
  translationKeys as sidebarMenuTranslationKeys,
} from '@/components/SidebarMenu.tsx'
import { InlineMenu } from '@/components/HeaderInlineMenu.tsx'
import {
  Cart,
  translationKeys as inlineCartTranslationKeys,
} from '@/islands/Cart.tsx'
import { LanguageSwitcher } from '@/islands/LanguageSwitcher.tsx'
import { LanguageCode, TranslationMap } from '@/translations.ts'
import { Locale } from '@/config/locales.ts'
// import { CountrySelector } from '@/islands/CountrySelector.tsx'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'

interface HeaderProps {
  forceBackground?: boolean
  t: TranslationMap
  lang: LanguageCode
  locale: Locale
  href?: string
  comfortCheckout: boolean
}

export const translationKeys = [
  ...inlineCartTranslationKeys,
  ...sidebarMenuTranslationKeys,
] as const

// TODO: What was this for?
export type T = Pick<TranslationMap, typeof translationKeys[number]>

export function Header(
  { forceBackground = false, t, lang, locale, comfortCheckout }: HeaderProps,
) {
  const hasBackground = useSignal(forceBackground)
  const isVisible = useSignal(true)
  const lastScrollTop = useSignal(0)
  const isMobile = useSignal(IS_BROWSER ? globalThis.innerWidth < 640 : true)

  useEffect(() => {
    if (!IS_BROWSER) return

    let ticking = false

    const updateState = () => {
      const scrollTop = globalThis.scrollY

      hasBackground.value = forceBackground ||
        scrollTop > globalThis.innerHeight * 0.95
      isVisible.value = scrollTop < lastScrollTop.value || scrollTop < 100
      lastScrollTop.value = scrollTop

      console.log('hasBackground.value', hasBackground.value)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateState()
        })
        ticking = true
      }
    }

    const onResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateState()
        })
        ticking = true
      }
    }

    // Initial state
    updateState()

    // Event listeners with RAF for performance
    globalThis.addEventListener('scroll', onScroll, { passive: true })
    globalThis.addEventListener('resize', onResize, { passive: true })

    return () => {
      globalThis.removeEventListener('scroll', onScroll)
      globalThis.removeEventListener('resize', onResize)
    }
  }, [forceBackground])

  const baseClasses =
    'fixed top-0 left-0 w-full z-20 p-4 transition-all duration-500 text-secondary sm:text-secondary'
  const backgroundClasses = isMobile.value
    ? hasBackground.value ? 'bg-primary' : 'bg-transparent'
    : hasBackground.value
    ? 'bg-primary sm:!text-dark-blue lg:!text-secondary'
    : 'bg-transparent'
  const visibilityClasses = isVisible.value
    ? 'translate-y-0 opacity-100'
    : '-translate-y-full opacity-0'

  return (
    <>
      <header
        class={`${baseClasses} ${backgroundClasses} transform ${visibilityClasses}`}
      >
        <div class='flex items-center justify-between'>
          <div class='flex items-center space-x-4 flex-none'>
            <div class='lg:hidden'>
              <SidebarMenu
                transparentButton={true}
                lang={lang}
                locale={locale}
                t={t}
              />
            </div>
            <div class='hidden lg:block w-10'></div>
          </div>

          <a
            href='/'
            class='absolute left-1/2 transform -translate-x-1/2'
          >
            <ResponsiveImage
              src='sternvoll-name-bright.png'
              width={[275, 413, 550]}
              height={22}
              alt='Sternvoll Jewelry'
              class='2xl:w-[275px]'
              lazy={false}
              fetchpriority='high'
            />
          </a>

          <div class='flex items-center space-x-4 flex-none z-10'>
            <div class='hidden lg:inline-flex flex-col items-end text-right'>
              {
                /*
              <CountrySelector
                data-delay='2'
                initialLocale={locale}
              />
              */
              }
              <LanguageSwitcher
                data-delay='2'
                lang={lang}
              />
            </div>
            <div class='hidden lg:inline'>
              <a href='https://account.pixelpilot.club/'>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    cx='12'
                    cy='8'
                    r='4'
                    stroke='currentColor'
                    stroke-width='1'
                  />
                  <path
                    d='M4 20c0-4 4-6 8-6s8 2 8 6'
                    stroke='currentColor'
                    stroke-width='1'
                    stroke-linecap='round'
                  />
                </svg>
              </a>
            </div>
            <Cart
              data-delay='1'
              transparentButton={true}
              t={t}
              lang={lang}
              country={`${lang}_${locale.code}`}
              comfortCheckout={comfortCheckout}
            />
          </div>
        </div>

        {/* Inline Navigation Links for large screens */}
        <InlineMenu />
      </header>
    </>
  )
}
