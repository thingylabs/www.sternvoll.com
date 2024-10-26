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
            class: 'bottom-[25vw]',
          },
        }}
      >
        <div
          class={`
        h-full pt-[20vw]
        font-accent
        flex flex-col justify-center items-center
        `}
        >
          <p
            class={`
          text-[6vw] md:text-[5vw] xl:text-[4vw]
          text-center
          `}
          >
            Im Herzen Stuttgarts kreiert Sternvoll<br />
            einzigartigen Schmuck, inspiriert von<br />
            kosmischer Schönheit.
          </p>
          <div
            class={`
          relative pt-[3vw]
          h-[45vw] w-[45vw]
          
          `}
          >
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
