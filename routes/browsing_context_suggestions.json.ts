// routes/browsing_context_suggestions.json.ts
import { FreshContext } from '$fresh/server.ts'
import { Data } from './_middleware.ts'
import { getCountryNameByCode } from '@/utils/geo.ts'

export const handler = (_req: Request, ctx: FreshContext<Data>): Response => {
  const { geo } = ctx.state

  const countryName = getCountryNameByCode(geo.country)

  const responseData = {
    detected_values: {
      country_name: countryName,
      country: {
        handle: geo.country,
        name: countryName,
      },
    },
    features: {},
    suggestions: [],
  }

  return new Response(JSON.stringify(responseData), {
    headers: { 'Content-Type': 'application/json' },
  })
}
