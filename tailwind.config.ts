import { type Config } from 'tailwindcss'
import aspectRatio from '@tailwindcss/aspect-ratio'

export default {
  theme: {
    extend: {
      colors: {
        primary: '#22212E',
        secondary: '#D6BFB7',
        'secondary-light': '#d6b59f',
        tertiary: '#EFECEC',
        'tertiary-darker': '#E7E4E4',
        background: '#f6f4f2',
        'accent-blue': '#051F34',
        'skin-tone': '#D8C1B9',
      },
      fontFamily: {
        accent: ['Sorts Mill Goudy', 'serif'],
      },
    },
  },
  content: [
    '{routes,islands,components}/**/*.{ts,tsx,js,jsx}',
  ],
  plugins: [
    aspectRatio,
  ],
} satisfies Config
