// utils/geo.ts
import {
  LanguageCode,
  languages,
  TranslationKey,
  TranslationMap,
  translations,
} from '@/translations.ts'
import { locales } from '@/config/locales.ts'
import { Locale } from '@/config/locales.ts'
import { COOKIE_KEYS, getCookie } from '@/utils/cookies.ts'

// Pre-compute maps for faster lookups
const CURRENCY_BY_COUNTRY = new Map(
  locales.map((locale) => [locale.code, locale.currency.code]),
)

const COUNTRY_NAMES = new Map(
  locales.map((locale) => [locale.code, locale.country]),
)

const LANG_CODES = new Set(languages.map((obj) => obj.code))

// Pre-compute EU countries set for faster lookup
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

export function getCurrencyByCountryCode(
  countryCode: string,
): string | undefined {
  return CURRENCY_BY_COUNTRY.get(countryCode)
}

export function getCountryNameByCode(code: string): string | undefined {
  return COUNTRY_NAMES.get(code)
}

// Memoize translation maps
const translationCache = new Map<string, TranslationMap>()

function getTranslations(
  lang: LanguageCode,
  keys?: readonly TranslationKey[],
): TranslationMap {
  const cacheKey = `${lang}-${keys?.join(',') || 'all'}`

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  const result = {} as TranslationMap
  const translationKeys = keys || Object.keys(translations) as TranslationKey[]

  translationKeys.forEach((key) => {
    const translationEntry = translations[key]
    result[key] = translationEntry[lang as keyof typeof translationEntry] ?? key
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

  let cookieLang = getCookie(COOKIE_KEYS.LANGUAGE)
  if (!LANG_CODES.has(cookieLang as LanguageCode)) {
    cookieLang = undefined
  }
  const country = getCookie(COOKIE_KEYS.COUNTRY) as string ||
    req.headers.get('cf-ipcountry') ||
    browserCountry || 'DE'

  const url = new URL(req.url)
  const firstPathPartial = url.pathname.split('/')[1]
  const langPartial = LANG_CODES.has(firstPathPartial as LanguageCode)
    ? firstPathPartial as LanguageCode
    : undefined

  // Language redirect logic
  if (!langPartial) {
    if (!cookieLang && browserLang !== 'en') {
      url.pathname = `/${browserLang}${url.pathname}`
      return [null, redirect(url)]
    }
    if (cookieLang && cookieLang !== 'en') {
      url.pathname = `/${cookieLang}${url.pathname}`
      return [null, redirect(url)]
    }
  }

  if (langPartial) {
    if (cookieLang === 'en') {
      url.pathname = url.pathname.replace(`/${langPartial}`, '')
      return [null, redirect(url)]
    }
    if (cookieLang && cookieLang !== langPartial) {
      url.pathname = url.pathname.replace(`/${langPartial}`, `/${cookieLang}`)
      return [null, redirect(url)]
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
    .map((elem, i) => (i === 1 ? elem.toUpperCase() : elem))

  return {
    lang: LANG_CODES.has(lang as LanguageCode) ? lang as LanguageCode : 'en',
    country: region,
  }
}
