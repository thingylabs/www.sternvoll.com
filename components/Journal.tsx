import { FillLetter } from '@/components/FillLetter.tsx'

interface JournalProps {
  imageSrc: string
  title: string
  date: string
}

export function Journal({ imageSrc, title, date }: JournalProps) {
  return (
    <>
      <div class='lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center lg:justify-center'>
        {/* Text Section */}
        <div class='flex flex-col justify-center items-center text-center p-8 pt-12 md:pb-0 lg:justify-center lg:items-center lg:text-center'>
          <div class='lg:w-[80%]'>
            <h2 class='text-[5vw] font-accent'>Journal</h2>
            <p class='text-3xl font-accent italic pt-8 leading-normal md:w-1/2 md:mx-auto lg:w-full lg:mx-0 2xl:text-[3vw]'>
              Inspirierende Geschichten, Trends und Einblicke in die Schmuckwelt
            </p>
          </div>

          <div class='mt-12'>
            <FillLetter firstLine='ALL' secondLine='STORIES' href='#' />
          </div>
        </div>

        {/* Image Section */}
        <div class='flex justify-center items-center w-full p-10 md:w-[55%] md:mx-auto lg:w-full'>
          <div class='relative'>
            {/* Smaller background cover for md and above */}
            <div class='hidden md:block absolute left-[-40px] top-1/2 transform -translate-y-1/2 lg:left-[-60px] lg:top-[-40px] lg:translate-y-0 w-[60%] h-[60%] z-0 rounded shadow-lg'>
              <img
                src='/journal-cover-background.jpg'
                alt='Smaller Cover'
                class='w-full h-full object-cover rounded shadow-lg'
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

              {/* Main book cover image */}
              <div class='relative w-full h-full rounded shadow-lg md:shadow-xl'>
                <img
                  src={'/' + imageSrc}
                  alt={title}
                  class='w-full h-full object-cover rounded shadow-lg md:shadow-xl'
                />

                <div class='absolute inset-0 flex flex-col justify-between items-center p-6'>
                  {/* Title */}
                  <h2 class='text-white text-xl font-serif tracking-wide mt-4'>
                    <img src='/Sternvoll-bright.png' alt='Sternvoll Logo' />
                  </h2>

                  {/* Date at the bottom */}
                  <p class='text-lg font-accent tracking-widest text-white mb-4'>
                    {date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
