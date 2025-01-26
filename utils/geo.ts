// utils/geo.ts
import {
  LanguageCode,
  languages,
  TranslationKey,
  TranslationMap,
  translations,
} from '@/translations.ts'
import { getCookies } from 'cookie'
import { Locale, locales } from '@/config/locales.ts'
import { COOKIE_KEYS } from '@/utils/cookieKeys.ts'

const CURRENCY_BY_COUNTRY = new Map(
  locales.map((l) => [l.code, l.currency.code]),
)
const COUNTRY_NAMES = new Map(locales.map((l) => [l.code, l.country]))
const LANG_CODES = new Set(languages.map((l) => l.code))
const EU_COUNTRIES = new Set([
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
])

export function getCurrencyByCountryCode(countryCode: string) {
  return CURRENCY_BY_COUNTRY.get(countryCode)
}

export function getCountryNameByCode(code: string) {
  return COUNTRY_NAMES.get(code)
}

const translationCache = new Map<string, TranslationMap>()

function getTranslations(
  lang: LanguageCode,
  keys?: readonly TranslationKey[],
): TranslationMap {
  const cacheKey = `${lang}-${keys?.join(',') || 'all'}`
  if (translationCache.has(cacheKey)) return translationCache.get(cacheKey)!

  const result = {} as TranslationMap
  const translationKeys = keys || Object.keys(translations) as TranslationKey[]

  translationKeys.forEach((key) => {
    const entry = translations[key]
    result[key] = entry[lang as keyof typeof entry] ?? key
  })

  translationCache.set(cacheKey, result)
  return result
}

export type GeoData = {
  country: string
  isEuIp: boolean
  lang: LanguageCode
  locale: Locale
  getT: (keys?: readonly TranslationKey[]) => TranslationMap
}

type GeoReturn = [GeoData | null, ReturnType<typeof redirect> | null]

export function getGeoData(req: Request): GeoReturn {
  const { lang: browserLang, country: browserCountry } = getBrowserLocale(req)
  const cookies = getCookies(req.headers)

  const langCookie = cookies[COOKIE_KEYS.LANGUAGE]
  const cookieLang = LANG_CODES.has(langCookie as LanguageCode)
    ? langCookie
    : undefined

  const country = cookies[COOKIE_KEYS.COUNTRY] ||
    req.headers.get('cf-ipcountry') ||
    browserCountry ||
    'DE'

  const url = new URL(req.url)
  const langPartial = getLangFromPath(url.pathname)

  if (!langPartial) {
    if (!cookieLang && browserLang !== 'en') {
      return [null, redirectTo(url, browserLang)]
    }
    if (cookieLang && cookieLang !== 'en') {
      return [null, redirectTo(url, cookieLang)]
    }
  }

  if (langPartial) {
    if (cookieLang === 'en') {
      return [null, redirectToBase(url, langPartial)]
    }
    if (cookieLang && cookieLang !== langPartial) {
      return [null, redirectFromTo(url, langPartial, cookieLang)]
    }
  }

  const lang = langPartial || 'en'
  return [
    {
      country,
      isEuIp: EU_COUNTRIES.has(req.headers.get('cf-ipcountry') || 'DE'),
      lang,
      locale: locales.find((l) => l.code === country)!,
      getT: (keys?: readonly TranslationKey[]) => getTranslations(lang, keys),
    },
    null,
  ]
}

function getLangFromPath(pathname: string): LanguageCode | undefined {
  const firstPath = pathname.split('/')[1]
  return LANG_CODES.has(firstPath as LanguageCode)
    ? firstPath as LanguageCode
    : undefined
}

function redirectTo(url: URL, lang: string) {
  const newUrl = new URL(url)
  newUrl.pathname = `/${lang}${url.pathname}`
  return redirect(newUrl)
}

function redirectToBase(url: URL, lang: string) {
  const newUrl = new URL(url)
  newUrl.pathname = url.pathname.replace(`/${lang}`, '')
  return redirect(newUrl)
}

function redirectFromTo(url: URL, oldLang: string, newLang: string) {
  const newUrl = new URL(url)
  newUrl.pathname = url.pathname.replace(`/${oldLang}`, `/${newLang}`)
  return redirect(newUrl)
}

function redirect(url: URL) {
  return {
    redirect: Response.redirect(url.toString(), 307),
    path: url.pathname,
  }
}

function getBrowserLocale(req: Request) {
  const accepted = req.headers.get('Accept-Language') || ''
  const [lang = 'en', region = 'US'] = accepted
    .toLowerCase()
    .split(',')[0]
    ?.trim()
    .split('-')
    .map((elem) => elem.substring(0, 2))
    .map((elem, i) => i === 1 ? elem.toUpperCase() : elem)

  return {
    lang: LANG_CODES.has(lang as LanguageCode) ? lang as LanguageCode : 'en',
    country: region,
  }
}
