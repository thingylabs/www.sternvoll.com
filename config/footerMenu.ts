type MenuItem = {
  title: string
  links: { label: string; href: string }[]
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
    links: [
      { label: 'Something interesting', href: '#' },
      { label: 'Another something', href: '#' },
      { label: 'More...', href: '#' },
    ],
  },
]
