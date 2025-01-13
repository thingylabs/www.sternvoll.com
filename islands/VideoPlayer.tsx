// islands/VideoPlayer.tsx
import { useEffect, useRef, useState } from 'preact/hooks'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import { TranslationMap } from '@/translations.ts'
import { Menu } from 'npm:lucide-react'

interface HlsConfig {
  enableWorker: boolean
  lowLatencyMode: boolean
  backBufferLength: number
  progressive: boolean
  startLevel: number
  abrEwmaDefaultEstimate: number
}

interface HlsEvents {
  MANIFEST_PARSED: string
  FRAG_LOADED: string
}

interface Hls {
  loadSource: (url: string) => void
  attachMedia: (video: HTMLVideoElement) => void
  on: (event: string, callback: () => void) => void
  destroy: () => void
  autoLevelEnabled: boolean
  nextLevel: number
  Events: HlsEvents
}

declare global {
  const Hls: {
    isSupported: () => boolean
    new (config: HlsConfig): Hls
    Events: HlsEvents
  }
}

export const translationKeys = [
  'Hero video showing jewelry collection',
  'Menu',
] as const

export type T = Pick<TranslationMap, typeof translationKeys[number]>

interface Props {
  t: TranslationMap
  posterImage: string
  hlsUrl: string
  alt: string
  width: number[]
  height: number
  class?: string
  onMenuClick?: () => void
}

export function VideoPlayer({
  posterImage,
  hlsUrl,
  alt,
  width,
  height,
  class: className,
  t,
  onMenuClick,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const getOptimalPosition = () => {
    if (globalThis.innerWidth < 768) {
      return 'center 40%'
    }
    if (globalThis.innerWidth < 1280) {
      return 'center 45%'
    }
    return 'center center'
  }

  const [objectPosition, setObjectPosition] = useState(() =>
    getOptimalPosition()
  )

  useEffect(() => {
    const handleResize = () => {
      setObjectPosition(getOptimalPosition())
    }

    globalThis.addEventListener('resize', handleResize)
    return () => globalThis.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!scriptLoaded) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12'
      script.async = true
      script.onload = () => setScriptLoaded(true)
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (!scriptLoaded || !Hls) return

    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        progressive: true,
        startLevel: 0,
        abrEwmaDefaultEstimate: 500000,
      })

      hlsRef.current = hls

      hls.loadSource(hlsUrl)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play()
        setIsVideoLoaded(true)
      })

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy()
          hlsRef.current = null
        }
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl
      video.addEventListener('loadedmetadata', () => {
        void video.play()
        setIsVideoLoaded(true)
      })
    }
  }, [hlsUrl, scriptLoaded])

  return (
    <div class={`relative w-full h-full ${className || ''}`}>
      {/* Poster Image */}
      <div
        class={`absolute inset-0 transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ResponsiveImage
          src={posterImage}
          alt={alt}
          width={width}
          height={height}
          lazy={false}
          fetchpriority='high'
          decoding='sync'
          class='w-full h-full object-cover'
          objectPosition={objectPosition}
        />
      </div>

      {/* Video */}
      <video
        ref={videoRef}
        class={`w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectPosition }}
        playsinline
        muted
        loop
        poster={posterImage}
      />

      {/* Menu Overlay - Always visible and on top */}
      <div class='absolute top-0 left-0 right-0 z-50 p-6'>
        <button
          onClick={onMenuClick}
          class='flex items-center space-x-2 text-white hover:opacity-80 transition-opacity'
          title={t['Menu']}
        >
          <Menu size={32} />
          <span class='text-lg uppercase tracking-wider'>{t['Menu']}</span>
        </button>
      </div>
    </div>
  )
}
