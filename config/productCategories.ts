import { TranslationKey } from '@/translations.ts'

type Category = {
  label: TranslationKey
  link: string
}

export const categories: Category[] = [
  { label: 'Rings', link: '/collections/rings' },
  { label: 'Earrings', link: '/collections/earrings' },
  { label: 'Clip-ons', link: '/collections/pain-free-clip-ons-earclips' },
  { label: 'Necklaces', link: '/collections/necklaces' },
  { label: 'Bracelets', link: '/collections/bracelets' },
]
