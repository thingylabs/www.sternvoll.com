import type { LanguageCode } from '@/translations.ts'

const SHOPIFY_SHOP = Deno.env.get('SHOPIFY_SHOP')
const SHOPIFY_ACCESS_TOKEN = Deno.env.get('SHOPIFY_ACCESS_TOKEN')
const SHOPIFY_ADMIN_API_ACCESS_TOKEN = Deno.env.get(
  'SHOPIFY_ADMIN_API_ACCESS_TOKEN',
)

// Ensure required environment variables are set
// Not break the GH Build
// if (!SHOPIFY_SHOP || !SHOPIFY_ACCESS_TOKEN || !SHOPIFY_ADMIN_API_ACCESS_TOKEN) {
//   throw new Error(
//     'Environment variables `SHOPIFY_SHOP`, `SHOPIFY_ACCESS_TOKEN`, and `SHOPIFY_ADMIN_API_ACCESS_TOKEN` must be set!',
//   )
// }

export async function graphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
  lang?: LanguageCode,
): Promise<T> {
  const resp = await fetch(`https://${SHOPIFY_SHOP}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN!,
      'Accept-Language': lang || 'en',
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`${resp.status} ${body}`)
  }
  const json = await resp.json()
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join('\n'))
  }
  return json.data as T
}

export async function adminApiGraphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const resp = await fetch(
    `https://${SHOPIFY_SHOP}/admin/api/2024-10/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    },
  )
  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`${resp.status} ${body}`)
  }
  const json = await resp.json()
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join('\n'))
  }
  return json.data as T
}
