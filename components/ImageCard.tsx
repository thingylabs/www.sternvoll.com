import { FunctionalComponent } from 'preact'

interface ImageCardProps {
  image: string
  title: string
  text: string
  linkTitle: string
  link: string
  orientation?: 'left' | 'right' // Defaults to left
  backgroundColor?: string // Configurable background color
}

export const ImageCard: FunctionalComponent<ImageCardProps> = ({
  image,
  title,
  text,
  linkTitle,
  link,
  orientation = 'left',
  backgroundColor = '#f4f4f4', // Default background color
}) => {
  const isRight = orientation === 'right'

  return (
    <div class='relative w-full overflow-hidden'>
      {/* Colored Background Block */}
      <div
        class={`hidden lg:block absolute w-[54%] h-[70%] ${
          isRight ? 'right-0' : 'left-0'
        } z-0 top-1/2 transform -translate-y-1/2`}
        style={{ backgroundColor }}
      >
      </div>

      {/* Content Wrapper with max-width for xl and flex-row-reverse when right */}
      <div
        class={`relative flex flex-col md:flex-row ${
          isRight ? 'md:flex-row-reverse' : ''
        } w-full max-w-full lg:max-w-[1280px] xl:max-w-[80vw] mx-auto`}
      >
        {/* Image Section */}
        <div class='relative w-full md:w-1/2 lg:w-[46%] z-10'>
          <img
            src={'/' + image}
            alt={title}
            class='w-full object-cover'
            crossorigin='anonymous'
          />
        </div>

        {/* Text Section */}
        <div
          class={`relative w-full md:w-1/2 lg:w-[54%] flex flex-col justify-center py-8 px-4 md:px-6 z-10 ${
            isRight ? 'md:pl-8 text-right' : 'md:pr-8 text-left'
          } box-border max-w-full lg:px-2 xl:px-12`}
        >
          <h2 class='text-5xl font-accent mb-4 md:leading-tight lg:text-7xl'>
            {title}
          </h2>
          <p class='text-3xl leading-normal mb-6 font-accent italic'>{text}</p>

          {/* Link Section with Dash */}
          <div class={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
            <a
              href={link}
              class='group relative pl-12 text-xs 2xl:text-base tracking-widest bg-white text-primary font-bold py-3 px-4 rounded hover:bg-primary hover:text-white transition-colors inline-block truncate'
            >
              {/* Dash before the link */}
              <span class='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-[2px] bg-secondary transition-all duration-300 ease-in-out group-hover:w-6 group-hover:left-3'>
              </span>
              {linkTitle}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
