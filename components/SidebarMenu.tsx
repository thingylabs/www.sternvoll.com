// components/SidebarMenu.tsx
import { useRef } from 'preact/hooks'
import { menuItems } from '@/config/headerMenu.ts'
import { LanguageCode, type TranslationMap } from '@/translations.ts'
import { MenuDrawer } from '@/islands/MenuDrawer.tsx'
import { LocaleDrawer } from '@/islands/LocaleDrawer.tsx'
import { Locale } from '@/config/locales.ts'

export const translationKeys = menuItems.map((category) => category.label)
  .concat(['Log in'])

interface SidebarMenuProps {
  transparentButton?: boolean
  lang: LanguageCode
  locale: Locale
  t: TranslationMap
}

export function SidebarMenu(
  { transparentButton = false, lang, locale, t }: SidebarMenuProps,
) {
  const menuRef = useRef<HTMLDialogElement>(null)
  const localeRef = useRef<HTMLDialogElement>(null)

  const handleBackdropClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      menuRef.current?.close()
    }
  }

  return (
    <div>
      <button
        type='button'
        onClick={() => menuRef.current?.showModal()}
        class={`relative rounded-md p-2 opacity-75 hover:opacity-100 ${
          transparentButton
            ? 'bg-transparent border border-secondary'
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
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </button>

      <dialog
        ref={menuRef}
        class='bg-transparent p-0 m-0 pt-[50%] sm:pt-0 sm:pr-[40%] md:pr-[50%] w-full max-w-full max-h-full h-full transition-transform duration-500 sm:translate-x-0 translate-y-0 backdrop-blur'
        onClick={handleBackdropClick}
      >
        <MenuDrawer
          onOpenLocaleSelector={() => localeRef.current?.showModal()}
          onClose={() => menuRef.current?.close()}
          lang={lang}
          locale={locale}
          t={t}
        />
      </dialog>

      <LocaleDrawer
        ref={localeRef}
        locale={locale}
        onClose={() => localeRef.current?.close()}
      />
    </div>
  )
}
