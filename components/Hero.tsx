import { JSX } from 'preact'
import { TranslationMap } from '@/translations.ts'

interface HeroProps {
  children: JSX.Element
  t: TranslationMap
}

export function Hero({ children, t }: HeroProps) {
  return (
    <div class='relative h-screen'>
      {/* The Header or other content passed as children */}
      {children}

      {/* Hero Image */}
      <img
        src='/hero.jpg'
        alt='Hero Image'
        class={`
        absolute inset-0 w-full h-full
        object-cover object-[95%]
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
            text-7xl md:text-[12vw] lg:text-[10vw] 2xl:text-[7.5vw]
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
            {t['everyday doesn\’t mean boring']}.
          </p>

          {/* Button */}
          <a
            href='#shop'
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
