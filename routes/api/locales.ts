// routes/api/locales.ts
import { locales } from '@/config/locales.ts'

export const handler = () => {
  return new Response(JSON.stringify(locales), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
