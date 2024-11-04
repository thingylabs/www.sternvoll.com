import { FreshContext } from '$fresh/server.ts'
import { getCookies } from 'cookie'

const supportedLanguages = ['de', 'en']

export async function handler(req: Request, ctx: FreshContext) {
  if (
    ctx.destination !== 'route' || // Request for assets
    req.url.includes('/api/')
  ) {
    return await ctx.next()
  }

  return await setGeoData(req, ctx)
}

async function setGeoData(req: Request, ctx: FreshContext) {
  const { lang: browserLang, country: browserCountry } =
    extractLanguageAndCountry(req)
  const cookies = getCookies(req.headers)

  const url = new URL(req.url)
  const firstPathPartial = url.pathname.split('/')[1]
  const isLanguageInPath = supportedLanguages.includes(firstPathPartial)

  if (!isLanguageInPath) {
    if (!cookies['lang']) {
      if (
        browserLang !== 'en' &&
        supportedLanguages.includes(browserLang)
      ) {
        url.pathname = `/${browserLang}${url.pathname}`
        return Response.redirect(url.toString(), 307)
      }
    }
  }
  if (cookies['lang'] === 'en') {
    url.pathname = url.pathname.replace(`/${firstPathPartial}`, '')
    return Response.redirect(url.toString(), 307)
  }

  ctx.state.geo = {
    country: browserCountry,
    lang: isLanguageInPath ? firstPathPartial : 'en',
  }

  return await ctx.next()
}

function extractLanguageAndCountry(req: Request) {
  const accepted = req.headers.get('Accept-Language') || ''
  const [lang = 'en', region = 'US'] = accepted
    .split(',')[0]
    ?.trim()
    .split('-')

  return {
    lang: lang.substring(0, 2),
    country: region,
  }
}
