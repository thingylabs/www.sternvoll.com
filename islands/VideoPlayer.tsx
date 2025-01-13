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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

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
    if (isVideoLoaded) {
      const transitionInterval = setInterval(() => {
        setIsTransitioning(prev => !prev)
      }, 5000) // Adjust timing as needed

      return () => clearInterval(transitionInterval)
    }
  }, [isVideoLoaded])

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

      hls.on(Hls.Events.FRAG_LOADED, () => {
        const currentHls = hlsRef.current
        if (currentHls?.autoLevelEnabled) {
          currentHls.nextLevel = -1
        }
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
      <div
        class={`absolute inset-0 transition-all duration-1000 ${
          isVideoLoaded ? (isTransitioning ? 'opacity-0' : 'opacity-100') : 'opacity-100'
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

      <video
        ref={videoRef}
        class={`w-full h-full object-cover transition-all duration-1000 ${
          isVideoLoaded ? (isTransitioning ? 'opacity-100' : 'opacity-0') : 'opacity-0'
        }`}
        style={{ objectPosition }}
        playsinline
        muted
        loop
        poster={posterImage}
      />
    </div>
  )
}