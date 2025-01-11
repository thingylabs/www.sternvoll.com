// components/PreloadImage.tsx
import { ImageFormat } from '@/utils/types.ts'

interface PreloadImageProps {
  src: string
  widths: number[]
  format: ImageFormat
}

export const PreloadImage = ({ src, widths, format }: PreloadImageProps) => {
  if (!widths || widths.length === 0) {
    throw new Error('PreloadImage requires at least one width.')
  }

  const mimeTypes: Record<ImageFormat, string> = {
    avif: 'image/avif',
    webp: 'image/webp',
    jpg: 'image/jpeg',
  }

  const dotIndex = src.lastIndexOf('.')
  const baseName = dotIndex === -1 ? src : src.slice(0, dotIndex)

  const srcSetEntries = widths.map((w) =>
    `/scaled/${baseName}-${w}.${format} ${w}w`
  )
  const srcSet = srcSetEntries.join(', ')

  const mainWidth = widths[0]

  return (
    <link
      rel='preload'
      as='image'
      crossOrigin='anonymous'
      type={mimeTypes[format]}
      imagesrcset={srcSet}
      sizes={`${mainWidth}px`}
      fetchpriority='high'
      decoding='sync'
      loading='eager'
    />
  )
}
