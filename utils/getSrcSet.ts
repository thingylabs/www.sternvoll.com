// utils/getSrcSet.ts
import { asset } from '$fresh/runtime.ts'

type ImageFormat = 'avif' | 'webp' | 'jpg'

interface ShopifyImageVariants {
  [format: string]: {
    'default': string
    '1.5x': string
    '2x': string
  }
}

interface GetSrcSetConfig {
  src: string
  format: ImageFormat
  assetPath?: string
  shopify?: ShopifyImageVariants | null
  width?: number
  widths?: number[]
}

export function getNameWithoutExtension(src: string) {
  const parts = src.split('.')
  return parts.length > 1 ? parts.slice(0, -1).join('.') : src
}

export function getSrcSet({
  src,
  format,
  assetPath = '/scaled',
  shopify = null,
  widths,
  width,
}: GetSrcSetConfig) {
  if (shopify) {
    const variants = shopify[format]
    return Object.entries(variants)
      .map(([key, url]) => `${url} ${key === 'default' ? '1x' : key}`)
      .join(', ')
  }

  if (widths) {
    return widths
      .map((w) =>
        `${asset(`${assetPath}/${src}-${Math.round(w)}.${format}`)} ${
          Math.round(w)
        }w`
      )
      .join(', ')
  }

  return asset(`${assetPath}/${src}-${width}.${format}`)
}

export type { GetSrcSetConfig, ImageFormat, ShopifyImageVariants }
