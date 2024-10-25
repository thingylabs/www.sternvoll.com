import { MovingText } from '@/islands/MovingText.tsx'
import { FillLetter } from '@/components/FillLetter.tsx'

export function OurStory() {
  return (
    <div class='h-full'>
      <MovingText
        firstLine='Moderne'
        secondLine='Klassiker'
        fontSize='23vw'
        color='#eee8e3'
        inset={{
          top: {
            xStart: -30,
            xEnd: 30,
          },
          bottom: {
            xStart: 30,
            xEnd: -40,
            class: 'bottom-[20vw] sm:bottom-[10vw]',
          },
        }}
      >
        <div class='h-full flex flex-col justify-center items-center font-accent pt-[25vw]'>
          <p class='text-[6vw] text-center xl:text-[4vw]'>
            Im Herzen Stuttgarts kreiert Sternvoll<br />
            einzigartigen Schmuck, inspiriert von<br />
            kosmischer Schönheit.
          </p>
          <div class='relative h-[45vw] w-[45vw] pt-[3vw] sm:pt-0 sm:h-[35vw] sm:w-[35vw]'>
            <FillLetter
              firstLine='OUR'
              secondLine='STORY'
              href='#'
            />
          </div>
        </div>
      </MovingText>
    </div>
  )
}
