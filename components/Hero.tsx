// components/Hero.tsx
import { TranslationMap } from '@/translations.ts'
import { ResponsiveImage } from './ResponsiveImage.tsx'

interface HeroProps {
  t: TranslationMap
}

export function Hero({ t }: HeroProps) {
  return (
    <div class='relative h-screen'>
      {/* Hero Image */}

      <ResponsiveImage
        src='hero.png'
        alt='Sternvoll Hero Image'
        width={[480, 786, 1280, 1920]}
        height={270}
        objectPosition='center right'
        fetchpriority='high'
        decoding='sync'
        lazy={false}
        class={`
          absolute inset-0 w-full h-full
          object-cover
        `}
      />

      {/* Overlay Content constrained to 1280px */}
      <div
        class={`
        absolute flex flex-col justify-end pb-14
        inset-0 text-left
        px-4 md:pl-[60px] xl:pl-[10vw]
        lg:justify-center lg:pb-0
      `}
      >
        <div class='w-full'>
          <h1
            class={`
            text-white font-accent
            text-7xl md:text-[12vw] lg:text-[10vw] 2xl:text-[7vw]
            leading-none drop-shadow
          `}
          >
            {t['Effortless chic']},
          </h1>
          <p
            class={`
            text-white font-accent italic leading-snug
            text-3xl md:text-4xl xl:text-[3vw]
            pr-10 lg:-mt-2 xl:leading-normal
            drop-shadow
          `}
          >
            {t["everyday doesn't mean boring"]}.
          </p>

          {/* Button */}
          <a
            href='/collections/all'
            class={`
            inline-block bg-white
            text-gray-900 font-bold hover:bg-gray-200
            xl:text-[1.2vw]
            mt-6 px-6 py-3 rounded-md
            lg:mt-10 xl:mt-[3vw]
            `}
          >
            {t['SHOP NOW']}
          </a>
        </div>
      </div>
    </div>
  )
}
