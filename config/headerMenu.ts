import { categories } from './productCategories.ts'

type MenuItem = {
  label: string
  link?: string
  items?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    label: 'Jewelry',
    link: '#jewelry',
    items: [
      {
        label: 'All Jewelry',
        link: '#all-jewelry',
        items: categories,
      },
      {
        label: 'Collections',
        link: '#collections',
        items: [
          { label: 'Heart-Shaped Jewelry', link: '#heart-shaped' },
          { label: 'Pain-Free Earclips', link: '#earclips' },
          { label: 'Diamond-Finishing', link: '#diamond-finishing' },
        ],
      },
      {
        label: 'Materials',
        link: '#materials',
        items: [
          { label: '18k Gold', link: '#18k-gold' },
          { label: '925 Sterling Silver', link: '#sterling-silver' },
          { label: 'Diamonds', link: '#diamonds' },
          { label: 'Pearls', link: '#pearls' },
        ],
      },
      {
        label: 'Price',
        link: '#price',
        items: [
          { label: '> 1,000 Euro', link: '#price-above-1000' },
          { label: '< 500 Euro', link: '#price-below-500' },
          { label: '< 100 Euro', link: '#price-below-100' },
          { label: '< 50 Euro', link: '#price-below-50' },
        ],
      },
    ],
  },
  { label: 'Rings', link: '#rings' },
  { label: 'Earrings', link: '#earrings' },
  { label: 'Necklaces', link: '#necklaces' },
  { label: 'Engagement & Wedding', link: '#engagement-wedding' },
  { label: 'On Sale 🔖', link: '#on-sale' },
]
