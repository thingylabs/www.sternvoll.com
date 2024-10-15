import { type Config } from 'tailwindcss'
import aspectRatio from 'https://esm.sh/@tailwindcss/aspect-ratio@0.4.0'

export default {
  content: [
    '{routes,islands,components}/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        slideRight: 'slideRight 0.4s ease-out',
        slideBottom: 'slideBottom 0.4s ease-out',
      },
    },
  },
  plugins: [
    aspectRatio,
  ],
} satisfies Config
