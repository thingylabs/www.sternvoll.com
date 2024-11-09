import { TranslationKey } from '@/translations.ts'

type Category = {
  label: TranslationKey
  link?: string
}

export const categories: Category[] = [
  { label: 'Rings', link: '#rings' },
  { label: 'Earrings', link: '#earrings' },
  { label: 'Clip-ons', link: '#clip-ons' },
  { label: 'Necklaces', link: '#necklaces' },
  { label: 'Bracelets', link: '#bracelets' },
]
