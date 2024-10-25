import { JSX } from 'preact'

interface HeroProps {
  children: JSX.Element
}

export function Hero({ children }: HeroProps) {
  return (
    <div class='relative h-screen'>
      {/* The Header or other content passed as children */}
      {children}

      {/* Hero Image */}
      <img
        src='/hero.jpg'
        alt='Hero Image'
        class='absolute inset-0 w-full h-full object-cover object-[95%]'
      />

      {/* Overlay Content constrained to 1280px */}
      <div class='absolute inset-0 flex flex-col justify-center items-start text-left px-4 md:pl-[60px]'>
        <div class='max-w-[1280px] w-full mx-auto'>
          <h1 class='text-white font-accent text-7xl md:text-[12vw] lg:text-[10vw] leading-none drop-shadow'>
            Effortless chic,
          </h1>
          <p class='text-white lg:-mt-2 font-accent italic text-3xl tracking-wider leading-snug pr-10 drop-shadow md:text-4xl'>
            alltäglich heißt nicht langweilig.
          </p>

          {/* Button */}
          <a
            href='#shop'
            class='mt-6 inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-md hover:bg-gray-200 lg:mt-10'
          >
            JETZT SHOPPEN
          </a>
        </div>
      </div>
    </div>
  )
}
