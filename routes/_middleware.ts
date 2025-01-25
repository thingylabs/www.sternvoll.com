// routes/_middleware.ts
import { FreshContext } from '$fresh/server.ts'
import { LanguageCode, TranslationKey, TranslationMap } from '@/translations.ts'
import { getGeoData } from '@/utils/geo.ts'
import { ImageFormat } from '@/utils/types.ts'
import { Locale } from '@/config/locales.ts'
import { COOKIE_KEYS, getCookie } from '@/utils/cookies.ts'
import { comfortCheckout } from '@/utils/comfortCheckout.ts'

interface GeoData {
  lang: LanguageCode
  country: string
  isEuIp: boolean
  locale: Locale
  getT: (keys?: readonly TranslationKey[]) => TranslationMap
}

export interface State {
  geo: GeoData
  imageFormat: ImageFormat
  comfortCheckout: boolean
}

export function handler(req: Request, ctx: FreshContext<State>) {
  const url = new URL(req.url)

  if (!shouldProcessRequest(ctx, url.pathname)) {
    return ctx.next()
  }

  const [geo, redirect] = getGeoData(req)
  if (redirect) {
    return redirect
  }

  ctx.state.geo = geo!
  ctx.state.comfortCheckout = handleComfortCheckout(req, !!geo && geo.isEuIp)
  ctx.state.imageFormat = determineImageFormat(req.headers.get('accept'))

  return ctx.next()
}

function shouldProcessRequest(
  ctx: FreshContext<State>,
  pathname: string,
): boolean {
  return ctx.destination === 'route' && !pathname.startsWith('/api/')
}

function handleComfortCheckout(req: Request, isEuIp: boolean): boolean {
  const savedPreference = getCookie(COOKIE_KEYS.COMFORT_CHECKOUT, req)
  const value = savedPreference !== undefined
    ? Boolean(savedPreference)
    : !isEuIp
  comfortCheckout.value = value
  return value
}

function determineImageFormat(acceptHeader: string | null): ImageFormat {
  if (!acceptHeader) return 'jpg'

  const formats: ImageFormat[] = ['avif', 'webp', 'jpg']
  return formats.find((format) => acceptHeader.includes(`image/${format}`)) ||
    'jpg'
}
