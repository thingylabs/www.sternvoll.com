// routes/_middleware.ts
import { FreshContext } from '$fresh/server.ts'
import { getCookies } from 'cookie'
import {
  LanguageCode,
  languages,
  TranslationKey,
  TranslationMap,
  translations,
} from '@/translations.ts'

const langCodes = languages.map((obj) => obj.code) as LanguageCode[]

export interface Data {
  geo: {
    lang: LanguageCode
    country: string
    locale: string
    getT: (keys?: TranslationKey[]) => TranslationMap
  }
}

export async function handler(req: Request, ctx: FreshContext<Data>) {
  if (
    ctx.destination !== 'route' || // Request for assets
    req.url.includes('/api/')
  ) {
    return await ctx.next()
  }

  const redirect = setGeoData(req, ctx)
  if (redirect) {
    return redirect
  }

  return await ctx.next()
}

function setGeoData(req: Request, ctx: FreshContext<Data>) {
  const { lang: browserLang, country: browserCountry } =
    extractLanguageAndCountry(req)
  const cookies = getCookies(req.headers)
  const cookieLang = langCodes.includes(cookies['lang'] as LanguageCode)
    ? (cookies['lang'] as LanguageCode)
    : undefined

  const url = new URL(req.url)
  const firstPathPartial = url.pathname.split('/')[1]
  const langPartial = langCodes.includes(firstPathPartial as LanguageCode)
    ? (firstPathPartial as LanguageCode)
    : undefined

  if (!langPartial) {
    if (!cookieLang) {
      if (browserLang !== 'en') {
        url.pathname = `/${browserLang}${url.pathname}`
        return Response.redirect(url.toString(), 307)
      }
    }
    if (cookieLang && cookieLang !== 'en') {
      url.pathname = `/${cookieLang}${url.pathname}`
      return Response.redirect(url.toString(), 307)
    }
  }
  if (langPartial && cookieLang === 'en') {
    url.pathname = url.pathname.replace(`/${langPartial}`, '')
    return Response.redirect(url.toString(), 307)
  }
  if (langPartial && cookieLang && cookieLang !== langPartial) {
    url.pathname = url.pathname.replace(`/${langPartial}`, `/${cookieLang}`)
    return Response.redirect(url.toString(), 307)
  }

  const lang = langPartial || 'en'
  const getT = (keys?: TranslationKey[]) => {
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
    country: browserCountry,
    lang,
    locale: `${lang}_${browserCountry}`,
    getT,
  }
}

function extractLanguageAndCountry(req: Request) {
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
