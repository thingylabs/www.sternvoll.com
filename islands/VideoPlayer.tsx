// islands/VideoPlayer.tsx
import { useEffect, useRef, useState } from 'preact/hooks'
import { ResponsiveImage } from '../components/ResponsiveImage.tsx'

interface VideoPlayerProps {
  posterImage: string
  hlsUrl: string
  alt: string
  width: number[]
  height: number
}

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

export default function VideoPlayer({
  posterImage,
  hlsUrl,
  alt,
  width,
  height,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Calculate optimal object-position based on viewport width
  const getOptimalPosition = () => {
    // For very narrow screens (mobile), focus more on the center
    if (globalThis.innerWidth < 768) {
      return 'center 40%' // Slight upward focus for vertical screens
    }
    // For medium screens (tablet)
    if (globalThis.innerWidth < 1280) {
      return 'center 45%' // Very slight upward focus
    }
    // For large screens, show full video
    return 'center center'
  }

  const [objectPosition, setObjectPosition] = useState(() =>
    getOptimalPosition()
  )

  // Update object-position on resize
  useEffect(() => {
    const handleResize = () => {
      setObjectPosition(getOptimalPosition())
    }

    globalThis.addEventListener('resize', handleResize)
    return () => globalThis.removeEventListener('resize', handleResize)
  }, [])

  // Load HLS.js script
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

  // Initialize HLS
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
      // Native HLS support (Safari)
      video.src = hlsUrl
      video.addEventListener('loadedmetadata', () => {
        void video.play()
        setIsVideoLoaded(true)
      })
    }
  }, [hlsUrl, scriptLoaded])

  return (
    <div class='relative w-full h-full'>
      <div
        class={`inset-0 transition-opacity duration-500 ${
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
          class='w-full aspect-ratio'
          objectPosition={objectPosition}
        />
      </div>

      <video
        ref={videoRef}
        class={`absolute inset-0 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500 w-full aspect-video`}
        style={{ objectPosition }}
        poster={`/scaled/${posterImage}-${Math.min(...width)}.jpg`}
        playsinline
        muted
        loop
        preload='metadata'
      />
    </div>
  )
}
