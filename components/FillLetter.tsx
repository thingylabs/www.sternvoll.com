interface FillLetterProps {
  letter: string
  firstLine: string
  secondLine: string
  href: string
}

export function FillLetter(
  { letter, firstLine, secondLine, href }: FillLetterProps,
) {
  return (
    <div class='flex justify-center items-center h-auto'>
      <a
        href={href}
        class='relative group transition-transform duration-700 ease-in-out inline-block'
      >
        {/* New container to hold both letter and text */}
        <div class='relative inline-flex flex-col items-center justify-center group-hover:scale-90 transition-transform duration-700 ease-in-out'>
          {/* Letter with Fill-Up Effect */}
          <span class='text-[240px] pt-12 font-accent leading-none bg-[linear-gradient(to_top,#CB9274_0%,#CB9274_50%,white_50%,white_100%)] bg-clip-text text-transparent bg-[length:100%_200%] bg-[0%_0%] group-hover:bg-[0%_100%] transition-all duration-1000 ease-in-out'>
            {letter}
          </span>

          {/* Main Text (Centered Above the Letter) */}
          <div class='absolute inset-0 flex items-center justify-center z-10 transition-transform duration-700 ease-in-out pointer-events-none'>
            <div class='text-xl font-accent text-[#002A3F] uppercase flex flex-col text-center'>
              <span>{firstLine}</span>
              <span>{secondLine}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
