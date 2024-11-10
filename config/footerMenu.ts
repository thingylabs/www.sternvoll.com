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
      { label: 'About Sternvoll', href: '/collections/about-us' },
      {
        label: 'Journal',
        href: '/collections/jewelry-insights-materials-finishes-benefits-care',
      },
    ],
  },
  {
    title: 'HELP CENTER',
    links: [
      { label: 'Contact information', href: '/policies/contact-information' },
      { label: 'Shipping policy', href: '/policies/shipping-policy' },
      { label: 'Refund policy', href: '/policies/refund-policy' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy policy', href: '/policies/privacy-policy' },
      { label: 'Terms of service', href: '/policies/terms-of-service' },
      { label: 'Legal notice', href: '/policies/legal-notice' },
    ],
  },
  {
    title: 'FROM OUR BLOG',
    links: [
      {
        label: 'Flashing Gold Plating vs. Micro Plating',
        href:
          '/collections/flashing-gold-plating-vs-micro-plating-a-comprehensive-comparisonflashing-gold-plating-vs-micro-plating-benefits-durability',
      },
      {
        label: 'Everything You Need to Know About 925 Sterling Silver',
        href:
          '/collections/everything-about-925-sterling-silver-benefits-care-tips',
      },
      {
        label: 'IGI Certified Quality',
        href: '/collections/igi-certified-importance-jewelry-purchase',
      },
    ],
  },
]
