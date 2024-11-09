import { TranslationKey } from '@/translations.ts'

type MenuItem = {
  title: TranslationKey

  links: {
    label: TranslationKey
    href: string
  }[]
}

export const menuItems: MenuItem[] = [
  {
    title: 'COMPANY',
    links: [
      { label: 'About Sternvoll', href: '#' },
      { label: 'Ambassadors', href: '#' },
      { label: 'Journal', href: '#' },
    ],
  },
  {
    title: 'HELP CENTER',
    links: [
      { label: 'Contact information', href: '#' },
      { label: 'Shipping policy', href: '#' },
      { label: 'Refund policy', href: '#' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of service', href: '#' },
      { label: 'Legal notice', href: '#' },
    ],
  },
  {
    title: 'FROM OUR BLOG',
    links: [ // TODO
      // @ts-ignore-next
      { label: 'Something interesting', href: '#' },
      // @ts-ignore-next
      { label: 'Another something', href: '#' },
      // @ts-ignore-next
      { label: 'More...', href: '#' },
    ],
  },
]
