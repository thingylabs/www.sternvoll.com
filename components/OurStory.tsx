// components/OurStory.tsx
import { MovingText } from '@/islands/MovingText.tsx'
import { FillLetter } from '@/components/FillLetter.tsx'
import { TranslationMap } from '@/translations.ts'

export function OurStory({ t }: { t: TranslationMap }) {
  return (
    <div class=''>
      <MovingText
        firstLine={t['Modern']}
        secondLine={t['Classics']}
        fontSize='15vw'
        color='#eee8e3'
        inset={{
          top: {
            xStart: -10,
            xEnd: 45,
          },
          bottom: {
            xStart: 115,
            xEnd: 20,
            class: 'bottom-[6vw]',
          },
        }}
      >
        <div
          class={`
        pt-[10vw]
        font-accent
        flex flex-col justify-center items-center
        `}
        >
          <p
            class={`
          text-[6vw] md:text-[5vw] xl:text-[4vw] 2xl:text-[2vw]
          text-center
          `}
          >
            {t['In the heart of Stuttgart,']}
            <br />
            {t['Sternvoll creates unique jewelry,']}
            <br />
            {t['inspired by cosmic beauty.']}
          </p>
          <div
            class={`
          relative
          h-[17vw] w-[17vw]
          `}
          >
            <FillLetter
              firstLine={t['OUR']}
              secondLine={t['STORY']}
              href='/collections/about-us'
            />
          </div>
        </div>
      </MovingText>
    </div>
  )
}
