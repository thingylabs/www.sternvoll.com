// islands/VideoPlayer.tsx
import { useEffect, useRef, useState } from 'preact/hooks'
import { LoadingSpinner } from '@/components/LoadingSpinner.tsx'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import { TranslationMap } from '@/translations.ts'

interface HlsInstance {
  loadSource(url: string): void
  attachMedia(element: HTMLVideoElement): void
  on(event: string, callback: () => void): void
  destroy(): void
}

interface Props {
  t: TranslationMap
  posterImage: string
  hlsUrl: string
  alt: string
  class?: string
}

export function VideoPlayer({
  posterImage,
  hlsUrl, 
  alt,
  class: className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<HlsInstance | null>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [objectPosition, setObjectPosition] = useState(() => getOptimalPosition())

  useEffect(() => {
    const handleResize = () => setObjectPosition(getOptimalPosition())
    globalThis.addEventListener('resize', handleResize)
    return () => globalThis.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let cleanup: (() => void) | undefined
    
    async function setupVideo() {
      if (typeof window === 'undefined') return
      const video = videoRef.current
      if (!video) return
      
      try {
        const { default: Hls } = await import('hls.js')
        // @ts-ignore HLS is loaded dynamically
        if (Hls.isSupported()) {
          // @ts-ignore HLS is loaded dynamically
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
          // @ts-ignore HLS is loaded dynamically
          hls.on(Hls.Events.MANIFEST_PARSED, () => void video.play())
          video.addEventListener('playing', () => setIsVideoLoaded(true))

          cleanup = () => {
            if (hlsRef.current) {
              hlsRef.current.destroy()
              hlsRef.current = null
            }
          }
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = hlsUrl
          video.addEventListener('loadedmetadata', () => void video.play())
          video.addEventListener('playing', () => setIsVideoLoaded(true))
        }
      } catch (error) {
        console.error('Failed to load HLS:', error)
      }
    }

    setupVideo()
    return () => cleanup?.()
  }, [hlsUrl])

  return (
    <div class={`fixed inset-0 overflow-hidden ${className || ''}`}>
      {/* Base layer - primary color background */}
      <div class="absolute inset-0 z-[-30] bg-primary" />

      {/* Middle layer - blurred image */}
      {!isVideoLoaded && (
        <div class="absolute inset-0 z-[-20]">
          <ResponsiveImage
            src={posterImage}
            alt={alt}
            width={[640, 768, 1024, 1280, 1536]}
            height={getResponsiveHeight()}
            class="w-full h-full object-cover"
            objectPosition={objectPosition}
            lazy={false}
            fetchpriority="high"
          />
        </div>
      )}

      {/* Top layer - loading spinner with transparent overlay */}
      {!isVideoLoaded && (
        <div class="absolute inset-0 z-[-10]">
          <LoadingSpinner />
        </div>
      )}

      {/* Video layer */}
      <video
        ref={videoRef}
        class={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isVideoLoaded ? 'opacity-100 z-[-20]' : 'opacity-0 z-[-30]'
        }`}
        style={{ objectPosition }}
        playsinline
        muted
        loop
        aria-label={alt}
        title={alt}
      />
    </div>
  )
}

function getOptimalPosition() {
  if (globalThis.innerWidth < 768) return 'center 40%'
  if (globalThis.innerWidth < 1280) return 'center 45%'
  return 'center center'
}

function getResponsiveHeight() {
  // Maintaining 16:9 aspect ratio
  return Math.round(1536 * (9/16))
}