interface JournalProps {
  imageSrc: string
  title: string
  date: string
}

export function Journal({ imageSrc, title, date }: JournalProps) {
  return (
    <section class='flex justify-center items-center w-full p-10 md:w-[55%] md:mx-auto'>
      <div class='relative max-w-md'>
        {/* Smaller cover for md and above */}
        <div class='hidden md:block absolute left-[-60px] top-[20px] w-[80%] h-[80%] z-0 rounded shadow-lg'>
          <img
            src='journal-cover-background.jpg'
            alt='Smaller Cover'
            class='w-full h-full object-cover rounded shadow-lg'
          />
        </div>

        <div class='relative z-10 md:translate-x-[40px]'>
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
              src={imageSrc}
              alt={title}
              class='w-full h-full object-cover rounded shadow-lg md:shadow-xl'
            />

            <div class='absolute inset-0 flex flex-col justify-between items-center p-6'>
              {/* Title */}
              <h2 class='text-white text-xl font-serif tracking-wide mt-4'>
                <img src='Sternvoll-bright.png' alt='Sternvoll Logo' />
              </h2>

              {/* Date at the bottom */}
              <p class='text-lg font-accent tracking-widest text-white mb-4'>
                {date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
