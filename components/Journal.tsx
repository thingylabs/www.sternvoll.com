interface JournalProps {
  imageSrc: string
  title: string
  date: string
}

export function Journal({ imageSrc, title, date }: JournalProps) {
  return (
    <section class='flex justify-center items-center w-full p-10'>
      <div class='max-w-md'>
        <div class='relative'>
          {/* Grey background layers - Successively shorter */}
          <div
            class='absolute w-full bg-gray-200 rounded-lg'
            style={{ right: '-10px', height: '95%', top: '2.5%' }}
          />
          <div
            class='absolute w-full bg-gray-300 rounded-lg'
            style={{ right: '-5px', height: '98%', top: '1%' }}
          />

          {/* Main book cover image */}
          <div class='relative w-full h-full rounded-lg shadow-xl overflow-hidden'>
            <img
              src={imageSrc}
              alt={title}
              class='w-full h-full object-cover rounded-lg'
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
