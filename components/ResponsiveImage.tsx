// components/ResponsiveImage.tsx
import { asset } from '$fresh/runtime.ts'
import {
  getNameWithoutExtension,
  getSrcSet,
  type ImageFormat,
  type ShopifyImageVariants,
} from '@/utils/getSrcSet.ts'

interface ResponsiveImageProps {
  src: string
  alt: string
  width: number | number[]
  height: number
  class?: string
  shopify?: ShopifyImageVariants | null
  lazy?: boolean
  fetchpriority?: 'auto' | 'low' | 'high'
  decoding?: 'sync' | 'async' | 'auto'
  assetPath?: string
  objectPosition?: string
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  shopify = null,
  class: classValue = '',
  lazy = true,
  fetchpriority = 'auto',
  assetPath = '/scaled',
  decoding = 'auto',
  objectPosition,
}: ResponsiveImageProps) {
  const nameOnly = shopify ? src : getNameWithoutExtension(src)
  const isResponsive = Array.isArray(width)

  const getSrcsetProps = (format: ImageFormat) => {
    if (shopify) {
      return {
        src,
        width: width as number,
        format,
        assetPath,
        shopify,
      }
    }

    if (isResponsive) {
      return {
        src: nameOnly,
        widths: width as number[],
        format,
        assetPath,
      }
    }

    return {
      src: nameOnly,
      width: width as number,
      format,
      assetPath,
    }
  }

  const fallbackWidth = isResponsive
    ? Math.min(...(width as number[]))
    : width as number

  // Combine object-position with existing classes if provided
  const imageClasses = [
    classValue,
    objectPosition && 'object-position',
  ].filter(Boolean).join(' ')

  // Create style object only if objectPosition is provided
  const imageStyles = objectPosition ? { objectPosition } : undefined

  return (
    <picture>
      {!shopify && (
        <source
          srcSet={getSrcSet(getSrcsetProps('avif'))}
          type='image/avif'
        />
      )}
      <source
        srcSet={getSrcSet(getSrcsetProps('webp'))}
        type='image/webp'
        fetchpriority={fetchpriority}
      />
      <source
        srcSet={getSrcSet(getSrcsetProps('jpg'))}
        type='image/jpeg'
        fetchpriority={fetchpriority}
      />
      <img
        src={!shopify
          ? asset(`${assetPath}/${nameOnly}-${fallbackWidth}.jpg`)
          : src}
        alt={alt}
        width={fallbackWidth}
        height={height}
        class={imageClasses}
        style={imageStyles}
        crossOrigin='anonymous'
        loading={lazy ? 'lazy' : 'eager'}
        fetchpriority={fetchpriority}
        decoding={decoding}
      />
    </picture>
  )
}
