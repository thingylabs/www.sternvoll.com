// routes/_middleware.ts
import { FreshContext } from '$fresh/server.ts'
import { LanguageCode, TranslationKey, TranslationMap } from '@/translations.ts'
import { getGeoData } from '@/utils/geo.ts'
import { logger } from '../utils/logger.ts'

export interface Data {
  geo: {
    lang: LanguageCode
    country: string
    isEuIp: boolean
    locale: string
    getT: (keys?: readonly TranslationKey[]) => TranslationMap
  }
}

export async function handler(req: Request, ctx: FreshContext<Data>) {
  if (
    ctx.destination !== 'route' || // Request for assets
    req.url.includes('/api/') ||
    req.url.includes('browsing_context_suggestions.json')
  ) {
    return await ctx.next()
  }

  const redirect = getGeoData(req, ctx)
  if (redirect) {
    logger.info('Redirecting', { url: req.url, newPath: redirect.path })
    return redirect.redirect
  }

  return await ctx.next()
}
