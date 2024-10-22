import { useSignal } from '@preact/signals'

interface FillLetterProps {
  letter: string
  firstLine: string
  secondLine: string
  href: string
}

export function FillLetter(
  { letter, firstLine, secondLine, href }: FillLetterProps,
) {
  const hovered = useSignal(false)

  return (
    <div class='w-full h-[500px] flex justify-center items-center transition-transform duration-700 ease-in-out hover:scale-75'>
      <a
        href={href}
        class='relative group transition-transform duration-700 ease-in-out bg-transparent'
        onMouseEnter={() => (hovered.value = true)}
        onMouseLeave={() => (hovered.value = false)}
      >
        {/* Letter with Fill-Up Effect */}
        <span
          class='absolute text-[240px] -top-[70px] font-accent leading-none'
          style={{
            backgroundImage: 'linear-gradient(to top, #CB9274 50%, white 50%)',
            backgroundSize: '100% 200%',
            backgroundPosition: hovered.value ? '0% 100%' : '0% 0%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            transition: 'background-position 1s ease, transform 1s ease',
          }}
        >
          {letter}
        </span>

        {/* Main Text (Horizontally Centered) */}
        <div class='relative z-10 transition-transform duration-700 ease-in-out'>
          <div class='text-xl font-accent text-[#002A3F] uppercase flex flex-col'>
            <span class='text-center'>{firstLine}</span>
            <span class='text-center'>{secondLine}</span>
          </div>
        </div>
      </a>
    </div>
  )
}
