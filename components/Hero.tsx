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

      {/* Overlay Content */}
      <div class='absolute inset-0 flex flex-col justify-center items-start text-left px-8'>
        <br />
        <h1 class='text-white font-accent text-7xl sm:text-7xl leading-tight'>
          <br />
          Effortless chic,
        </h1>
        <p class='text-white mt-4 font-accent italic text-2xl sm:text-2xl italic pr-10'>
          alltäglich heißt nicht langweilig.
        </p>

        {/* Button */}
        <a
          href='#shop'
          class='mt-6 inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-md hover:bg-gray-200'
        >
          JETZT SHOPPEN
        </a>
      </div>
    </div>
  )
}
