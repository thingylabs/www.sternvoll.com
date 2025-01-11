// components/Hero.tsx
import VideoPlayer from '@/islands/VideoPlayer.tsx'
import { TranslationMap } from '@/translations.ts'

interface HeroProps {
  t: TranslationMap
}

export function Hero({ t }: HeroProps) {
  return (
    <div class='relative w-full h-full object-cover'>
      <VideoPlayer
        posterImage='hero-video-cover' // Without extension, as ResponsiveImage handles this
        hlsUrl='/videos/sternvoll-jewelry/master.m3u8'
        alt={t['Hero video showing jewelry collection']}
        width={[1920, 1280, 854]} // Matching your video resolutions
        height={1080} // Adjust based on your aspect ratio
      />
    </div>
  )
}
