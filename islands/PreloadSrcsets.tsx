// islands/PreloadSrcsets.tsx
import { useEffect } from 'preact/hooks'

interface PreloadSrcsetsProps {
  srcsets: string[]
}

const preloaded = new Set<string>()

export function PreloadSrcsets({ srcsets }: PreloadSrcsetsProps) {
  useEffect(() => {
    if (
      (document.readyState === 'complete' ||
        document.readyState === 'interactive') &&
      srcsets?.length
    ) {
      srcsets.forEach((srcset) => {
        preloadImage(srcset)
      })
    }
  }, [srcsets])

  return null
}

function preloadImage(imagesrcset: string) {
  if (preloaded.has(imagesrcset)) return
  preloaded.add(imagesrcset)

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.setAttribute('imagesrcset', imagesrcset)
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}
