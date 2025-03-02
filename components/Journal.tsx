// components/Journal.tsx
import { FillLetter } from '@/components/FillLetter.tsx'
import { TranslationMap } from '@/translations.ts'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'

interface JournalProps {
  date: string
  t: TranslationMap
}

export function Journal({ date, t }: JournalProps) {
  return (
    <>
      <div class='lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center lg:justify-center'>
        {/* Text Section */}
        <div class='flex flex-col justify-center items-center text-center p-8 pt-12 md:pb-0 lg:justify-center lg:items-center lg:text-center'>
          <div class='lg:w-[80%]'>
            <h2 class='text-[5vw] font-accent'>{t['Journal']}</h2>
            <p class='text-3xl font-accent italic pt-8 leading-normal md:w-1/2 md:mx-auto lg:w-full lg:mx-0 2xl:text-[2vw]'>
              {t[
                'Inspiring stories, trends, and insights into the world of jewelry'
              ]}
            </p>
          </div>

          <div class='mt-12'>
            <FillLetter
              firstLine='ALL'
              secondLine='STORIES'
              href='/collections/jewelry-insights-materials-finishes-benefits-care'
            />
          </div>
        </div>

        {/* Image Section */}
        <div class='flex justify-center items-center w-full p-10 md:w-[55%] md:mx-auto lg:w-full'>
          <div class='relative'>
            {/* Smaller background cover for md and above */}
            <div class='hidden md:block absolute left-[-40px] top-1/2 transform -translate-y-1/2 lg:left-[-60px] lg:top-[-40px] lg:translate-y-0 w-[60%] h-[60%] z-0 rounded shadow-lg'>
              <ResponsiveImage
                src='journal-cover-background.jpg'
                alt='Sternvoll Jewelry Cover Background'
                width={282}
                height={466}
                class='w-full w-max-[282px] h-full object-cover rounded shadow-lg'
              />
            </div>

            <div class='relative z-10 md:translate-x-[40px] lg:translate-x-[40px] lg:scale-[0.8]'>
              {/* Grey background layers - Successively shorter */}
              <div
                class='absolute w-full bg-gray-200 rounded'
                style={{ right: '-10px', height: '95%', top: '2.5%' }}
              />
              <div
                class='absolute w-full bg-gray-300 rounded'
                style={{ right: '-5px', height: '98%', top: '1%' }}
              />

              <a href='/collections/jewelry-insights-materials-finishes-benefits-care'>
                <div class='relative w-full h-full rounded shadow-lg md:shadow-xl'>
                  {/* Main book cover image */}
                  <ResponsiveImage
                    src='journal-cover.jpg'
                    alt='Sternvoll Jewelry Journal Cover'
                    width={[376, 385, 470, 705]}
                    height={621}
                    class='w-full max-w-[470px] h-full object-cover rounded shadow-lg md:shadow-xl'
                  />

                  <div class='absolute inset-0 flex flex-col justify-between items-center p-6'>
                    {/* Title */}
                    <div class='p-4'>
                      <ResponsiveImage
                        src='sternvoll-name-bright.png'
                        width={[324, 486, 648]}
                        height={26}
                        alt='Sternvoll Jewelry'
                      />
                    </div>

                    {/* Date at the bottom */}
                    <p class='text-lg font-accent tracking-widest text-white mb-4'>
                      {date}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
