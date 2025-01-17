// islands/VideoPlayer.tsx
import { useEffect, useRef, useState } from 'preact/hooks'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import { TranslationMap } from '@/translations.ts'

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
}

export function VideoPlayer({
  posterImage,
  hlsUrl,
  alt,
  width,
  height,
  class: className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

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
      })

      video.addEventListener('playing', () => {
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
      })
      video.addEventListener('playing', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [hlsUrl, scriptLoaded])

  return (
    <div class={`relative w-full h-full ${className || ''}`}>
      <video
        ref={videoRef}
        class='absolute inset-0 w-full h-full object-cover'
        style={{ objectPosition }}
        playsinline
        muted
        loop
        poster={posterImage}
      />
    </div>
  )
}
