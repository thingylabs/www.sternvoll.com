import { MovingText } from '@/islands/MovingText.tsx'
import { FillLetter } from '@/components/FillLetter.tsx'
import { TranslationMap } from '@/translations.ts'

export function OurStory({ t }: { t: TranslationMap }) {
  return (
    <div class='h-full'>
      <MovingText
        firstLine={t['Modern']}
        secondLine={t['Classics']}
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
          text-[6vw] md:text-[5vw] xl:text-[4vw] 2xl:text-[3vw]
          text-center
          `}
          >
            {t['In the heart of Stuttgart, Sternvoll creates']}
            <br />
            {t['unique jewelry, inspired by']}
            <br />
            {t['cosmic beauty.']}
          </p>
          <div
            class={`
          relative pt-[3vw]
          h-[45vw] w-[45vw]
          `}
          >
            <FillLetter
              firstLine={t['OUR']}
              secondLine={t['STORY']}
              href='#'
            />
          </div>
        </div>
      </MovingText>
    </div>
  )
}
