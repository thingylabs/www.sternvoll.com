// components/PreloadImage.tsx
import { asset } from '$fresh/runtime.ts'
import type { JSX } from 'preact'

type ImageFormat = 'avif' | 'webp' | 'jpg'
type FetchPriority = 'auto' | 'low' | 'high'
type PreloadAs = 'image' | 'style' | 'script' | 'font' | 'document'

interface PreloadConfig {
  src: string
  width: number
  height?: number
  resolutions?: ('1.5x' | '2x')[]
  assetPath?: string
  formats?: ImageFormat[]
  decoding?: 'sync' | 'async' | 'auto'
  fetchpriority?: FetchPriority
  as?: PreloadAs
}

const getNameWithoutExtension = (src: string) => {
  const parts = src.split('.')
  return parts.length > 1 ? parts.slice(0, -1).join('.') : src
}

export function PreloadImage({
  src,
  width,
  height,
  resolutions = ['1.5x', '2x'],
  assetPath = '/scaled',
  formats = ['avif', 'webp', 'jpg'],
  decoding = 'auto',
  fetchpriority = 'auto',
  as = 'image',
}: PreloadConfig): JSX.Element {
  const nameOnly = getNameWithoutExtension(src)

  return (
    <>
      {formats.map((format) => {
        const baseSrc = `${
          asset(`${assetPath}/${nameOnly}.${format}`)
        } ${width}w ${height ? `${height}h` : ''}`
        const resSources = resolutions.map((res) => {
          const scaledWidth = width * parseFloat(res)
          const scaledHeight = height ? height * parseFloat(res) : undefined
          return `${
            asset(`${assetPath}/${nameOnly}@${res}.${format}`)
          } ${scaledWidth}w${scaledHeight ? ` ${scaledHeight}h` : ''}`
        })
        const srcSet = [baseSrc, ...resSources].join(', ')

        return (
          <link
            key={format}
            rel='preload'
            as={as}
            crossOrigin='anonymous'
            type={`image/${format === 'jpg' ? 'jpeg' : format}`}
            imagesrcset={srcSet}
            sizes={`${width}px`}
            fetchpriority={fetchpriority}
            decoding={decoding}
          />
        )
      })}
    </>
  )
}
