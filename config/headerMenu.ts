// config/headerMenu.ts
import { categories } from './productCategories.ts'
import { TranslationKey } from '@/translations.ts'

type MenuItem = {
  label: TranslationKey
  link?: string
  items?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    label: 'All Jewelry',
    link: '/collections/all',
    items: [
      {
        label: 'All Jewelry',
        link: '/collections/all',
        items: categories,
      },
      {
        label: 'Collections',
        link: '/collections/all',
        items: [
          {
            label: 'Heart-Shaped Jewelry',
            link: '/collections/heart-shaped-jewelry',
          },
          {
            label: 'Pain-Free Earclips',
            link: '/collections/pain-free-clip-ons-earclips',
          },
          {
            label: 'Diamond-Finishing',
            link: '/collections/diamond-finishing',
          },
        ],
      },
      {
        label: 'Materials',
        link: '/collections/all',
        items: [
          { label: '18k Gold', link: '/18k-gold' },
          {
            label: '925 Sterling Silver',
            link: '/collections/925-sterling-silver',
          },
          { label: 'Diamonds', link: '/collections/diamonds' },
          { label: 'Pearls', link: '/collections/pearls' },
        ],
      },
      {
        label: 'Price',
        link: '/collections/all',
        items: [
          { label: '> 1,000 Euro', link: '/collections/over-1k-euro' },
          { label: '< 500 Euro', link: '/collections/under-500-euro' },
          { label: '< 100 Euro', link: '/collections/under-100-euro' },
          { label: '< 50 Euro', link: '/collections/under-50-euro' },
        ],
      },
    ],
  },
  { label: 'Rings', link: '/collections/rings' },
  { label: 'Earrings', link: '/collections/earrings' },
  { label: 'Clip-ons', link: '/collections/pain-free-clip-ons-earclips' },
  { label: 'Necklaces', link: '/collections/necklaces' },
  { label: 'Engagement & Wedding', link: '/collections/engagement-wedding' },
  { label: 'On Sale', link: '/collections/on-sale' },
]
