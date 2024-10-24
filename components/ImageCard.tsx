import { FunctionalComponent } from 'preact'

interface ImageCardProps {
  image: string
  title: string
  text: string
  linkTitle: string
  link: string
  orientation?: 'left' | 'right' // Defaults to left
}

export const ImageCard: FunctionalComponent<ImageCardProps> = ({
  image,
  title,
  text,
  linkTitle,
  link,
  orientation = 'left',
}) => {
  const isRight = orientation === 'right'

  return (
    <div
      class={`flex flex-col md:flex-row ${
        isRight ? 'md:flex-row-reverse text-right' : 'text-left'
      } max-w-full overflow-hidden`}
    >
      {/* Image Section */}
      <div class='w-full md:w-1/2'>
        <img src={image} alt={title} class='w-full object-cover' />
      </div>

      {/* Text Section */}
      <div
        class={`w-full md:w-1/2 flex flex-col justify-center py-8 px-4 md:px-6 ${
          isRight ? 'md:pr-8' : 'md:pl-8'
        } box-border max-w-full`}
      >
        <h2 class='text-5xl font-accent mb-4 md:leading-tight'>{title}</h2>
        <p class='text-3xl leading-normal mb-6 font-accent italic'>
          {text}
        </p>

        {/* Link Section with Dash */}
        <div class={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
          <a
            href={link}
            class='group relative pl-12 text-xs tracking-widest bg-white text-primary font-bold py-3 px-4 rounded hover:bg-primary hover:text-white transition-colors inline-block truncate'
          >
            {/* Dash before the link */}
            <span class='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-[2px] bg-secondary transition-all duration-300 ease-in-out group-hover:w-6 group-hover:left-3'>
            </span>
            {linkTitle}
          </a>
        </div>
      </div>
    </div>
  )
}
