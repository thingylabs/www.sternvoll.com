// utils/geo.ts
import { getCookies } from 'cookie'
import {
  LanguageCode,
  languages,
  TranslationKey,
  TranslationMap,
  translations,
} from '@/translations.ts'
import { FreshContext } from '$fresh/server.ts'
import { Data } from '@/routes/_middleware.ts'
import { logger } from '@/utils/logger.ts'
import { locales } from '@/config/locales.ts'

export function getCurrencyByCountryCode(
  countryCode: string,
): string | undefined {
  const locale = locales.find((locale) => locale.code === countryCode)
  return locale?.currency.code
}

export function getCountryNameByCode(code: string): string | undefined {
  const locale = locales.find((locale) => locale.code === code)
  return locale ? locale.country : undefined
}

const langCodes = languages.map((obj) => obj.code) as LanguageCode[]

export function getGeoData(req: Request, ctx: FreshContext<Data>) {
  const { lang: browserLang, country: browserCountry } = getBrowserLocale(req)
  const cookies = getCookies(req.headers)

  // Handle language
  const cookieLang = langCodes.includes(cookies['lang'] as LanguageCode)
    ? (cookies['lang'] as LanguageCode)
    : undefined

  const url = new URL(req.url)
  const firstPathPartial = url.pathname.split('/')[1]
  const langPartial = langCodes.includes(firstPathPartial as LanguageCode)
    ? (firstPathPartial as LanguageCode)
    : undefined

  const country = cookies['country'] || browserCountry

  if (!langPartial) {
    if (!cookieLang) {
      if (browserLang !== 'en') {
        url.pathname = `/${browserLang}${url.pathname}`
        return redirect(url)
      }
    }
    if (cookieLang && cookieLang !== 'en') {
      url.pathname = `/${cookieLang}${url.pathname}`
      return redirect(url)
    }
  }
  if (langPartial && cookieLang === 'en') {
    url.pathname = url.pathname.replace(`/${langPartial}`, '')
    return redirect(url)
  }
  if (langPartial && cookieLang && cookieLang !== langPartial) {
    url.pathname = url.pathname.replace(`/${langPartial}`, `/${cookieLang}`)
    return redirect(url)
  }

  const lang = langPartial || 'en'
  const getT = (keys?: readonly TranslationKey[]) => {
    const result = {} as TranslationMap
    if (keys) {
      keys.forEach((key) => {
        const translationEntry = translations[key]
        result[key] = translationEntry[lang as keyof typeof translationEntry] ??
          key
      })
      return result
    }
    ;(Object.keys(translations) as TranslationKey[]).forEach((key) => {
      const translationEntry = translations[key]
      result[key] = translationEntry[lang as keyof typeof translationEntry] ??
        key
    })
    return result
  }

  ctx.state.geo = {
    country,
    isEuIp: isEuIp(req),
    lang,
    locale: `${lang}_${country}`,
    getT,
  }
}

function redirect(url: URL) {
  return {
    redirect: Response.redirect(url.toString(), 307),
    path: url.pathname,
  }
}

function isEuIp(req: Request) {
  const eu = [
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
    'GB',
  ]
  if (!req.headers.get('cf-ipcountry')) {
    logger.warn('Missing Cloudflare header `cf-ipcountry`')
  }
  return eu.includes(req.headers.get('cf-ipcountry') || 'DE')
}

function getBrowserLocale(req: Request) {
  const accepted = req.headers.get('Accept-Language') || ''
  const [lang = 'en', region = 'US'] = accepted
    .toLowerCase()
    .split(',')[0]
    ?.trim()
    .split('-')
    .map((elem) => elem.substring(0, 2))
    .map((elem, i) => (i === 1 ? elem.toUpperCase() : elem))

  return {
    lang: langCodes.includes(lang as LanguageCode)
      ? (lang as LanguageCode)
      : 'en',
    country: region,
  }
}
