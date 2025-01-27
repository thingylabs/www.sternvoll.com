// components/Hero.tsx
import { TranslationMap } from '@/translations.ts'
import { VideoPlayer } from '../islands/VideoPlayer.tsx'

interface Props {
  t: TranslationMap
}

export default function Hero({ t }: Props) {
  return (
    <div class='relative w-screen h-screen'>
      <VideoPlayer
        posterImage='hero-video-cover'
        hlsUrl='/videos/sternvoll-jewelry/master.m3u8'
        alt={t['Hero video showing jewelry collection']}
        class='absolute inset-0 w-full h-full object-cover'
        t={t}
      />
    </div>
  )
}
