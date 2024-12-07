// utils/cookies.ts
import { IS_BROWSER } from '$fresh/runtime.ts'

type CookieOptions = {
  path?: string
  maxAge?: number
  expires?: Date
  sameSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
  domain?: string
}

export const COOKIE_KEYS = {
  COMFORT_CHECKOUT: 'comfortCheckout',
  LANGUAGE: 'language',
  COUNTRY: 'country',
  THEME: 'theme',
} as const

export type CookieKey = typeof COOKIE_KEYS[keyof typeof COOKIE_KEYS]
export type CookieValue = string | boolean | number
type ParsedCookieValue = string | boolean | undefined

export function getCookie(
  key: CookieKey,
  req?: Request,
): ParsedCookieValue {
  if (IS_BROWSER) {
    const match = document.cookie.match(new RegExp(`${key}=([^;]+)`))
    return parseCookieValue(match ? decodeURIComponent(match[1]) : undefined)
  }

  if (!req) return undefined

  const cookie = req.headers.get('cookie')
  if (!cookie || !cookie.includes(`${key}=`)) return undefined

  const match = cookie.match(new RegExp(`${key}=([^;]+)`))
  return parseCookieValue(match ? decodeURIComponent(match[1]) : undefined)
}

export function setCookie(
  key: CookieKey,
  value: CookieValue,
  options: CookieOptions = {},
  response?: Response,
): void {
  const cookie = createCookieString(key, value, options)

  if (IS_BROWSER) {
    document.cookie = cookie
    return
  }

  if (!response) return

  response.headers.append('Set-Cookie', cookie)
}

export function deleteCookie(
  key: CookieKey,
  options: Omit<CookieOptions, 'expires' | 'maxAge'> = {},
  response?: Response,
): void {
  setCookie(
    key,
    '',
    {
      ...options,
      expires: new Date(0),
      maxAge: 0,
    },
    response,
  )
}

function serializeCookieValue(value: CookieValue): string {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }
  return value.toString()
}

function parseCookieValue(value: string | undefined): ParsedCookieValue {
  if (!value) return undefined
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}

function createCookieString(
  key: CookieKey,
  value: CookieValue,
  options: CookieOptions = {},
): string {
  const defaults = {
    path: '/',
    sameSite: 'Strict',
    secure: true,
    maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
  } as const

  const opts = { ...defaults, ...options }

  let cookie = `${key}=${encodeURIComponent(serializeCookieValue(value))}`

  if (opts.path) cookie += `; Path=${opts.path}`
  if (opts.maxAge) {
    cookie += `; Max-Age=${opts.maxAge}`
    if (!opts.expires) {
      const expires = new Date(Date.now() + opts.maxAge * 1000)
      cookie += `; Expires=${expires.toUTCString()}`
    }
  }
  if (opts.expires) cookie += `; Expires=${opts.expires.toUTCString()}`
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`
  if (opts.secure) cookie += '; Secure'
  if (opts.domain) cookie += `; Domain=${opts.domain}`

  return cookie
}
