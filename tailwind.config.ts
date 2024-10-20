import { type Config } from 'tailwindcss'
import aspectRatio from 'https://esm.sh/@tailwindcss/aspect-ratio@0.4.0'

export default {
  theme: {
    extend: {
      colors: {
        primary: '#22212E',
        secondary: '#D6BFB7',
        tertiary: '#EFECEC',
        'tertiary-darker': '#E7E4E4',
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
