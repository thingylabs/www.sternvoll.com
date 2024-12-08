// components/FillLetter.tsx
interface FillLetterProps {
  firstLine: string
  secondLine: string
  letter?: string
  href: string
}

export function FillLetter(
  { letter, firstLine, secondLine, href }: FillLetterProps,
) {
  return (
    <div class='h-full w-full flex items-center justify-center overflow-hidden'>
      <a
        href={href}
        class='group'
      >
        {/* New container to hold both letter and text */}
        <div
          class={`
        relative items-center
        pt-[25%]
        group-hover:scale-90
        transition-transform duration-700 ease-in-out
        `}
        >
          {/* Letter with Fill-Up Effect */}
          <div
            class={`
          text-[50vw] sm:text-[15vw] leading-none font-accent
          bg-[linear-gradient(to_top,#CB9274_0%,#CB9274_50%,white_50%,white_100%)]
          bg-clip-text text-transparent
          bg-[length:100%_200%] bg-[0%_0%]
          group-hover:bg-[0%_100%]
          transition-all duration-1000 ease-in-out
          `}
          >
            {letter ?? firstLine.charAt(0)}
          </div>

          {/* Main Text (Centered Above the Letter) */}
          <div
            class={`
          absolute tracking-[0.2em] inset-0 flex items-center justify-center z-10
          transition-transform duration-700 ease-in-out
          `}
          >
            <div
              class={`
            text-[3vw] sm:text-[1vw]
            font-accent font-semibold uppercase
            flex flex-col text-center
            `}
            >
              <span>{firstLine}</span>
              <span>{secondLine}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
