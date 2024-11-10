import { MovingText } from '@/islands/MovingText.tsx'
import { FillLetter } from '@/components/FillLetter.tsx'
import { TranslationMap } from '@/translations.ts'

export function OurStory({ t }: { t: TranslationMap }) {
  return (
    <div class='h-full'>
      <MovingText
        firstLine={t['Modern']}
        secondLine={t['Classics']}
        fontSize='13vw'
        color='#eee8e3'
        inset={{
          top: {
            xStart: 0,
            xEnd: 40,
          },
          bottom: {
            xStart: 130,
            xEnd: 20,
            class: 'bottom-[10vw]',
          },
        }}
      >
        <div
          class={`
        h-full pt-[10vw]
        font-accent
        flex flex-col justify-center items-center
        `}
        >
          <p
            class={`
          text-[6vw] md:text-[5vw] xl:text-[4vw] 2xl:text-[2.5vw]
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
          relative
          h-[20vw] w-[45vw]
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
