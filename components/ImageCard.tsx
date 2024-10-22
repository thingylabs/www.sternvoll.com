import { FunctionalComponent } from 'preact'

interface ImageCardProps {
  image: string
  title: string
  text: string
  linkTitle: string
  link: string
  orientation?: 'left' | 'right' // Optional to choose orientation, defaults to left
}

export const ImageCard: FunctionalComponent<ImageCardProps> = ({
  image,
  title,
  text,
  linkTitle,
  link,
  orientation = 'left', // default orientation
}) => {
  const isRight = orientation === 'right'

  return (
    <div
      class={`flex flex-col md:flex-row ${
        isRight ? 'md:flex-row-reverse text-right' : 'text-left'
      }`}
    >
      {/* Image Section */}
      <div class='w-full md:w-1/2'>
        <img src={image} alt={title} class='w-full object-cover' />
      </div>

      {/* Text Section */}
      <div class='w-full md:w-1/2 flex flex-col justify-center p-8'>
        <h2 class='text-4xl font-accent mb-4'>{title}</h2>
        <p class='text-xl mb-6 font-accent italic'>{text}</p>
        <a
          href={link}
          class='bg-primary text-white inline-block border-2 border-primary text-primary font-bold py-3 px-6 rounded hover:bg-secondary hover:text-black transition-colors'
        >
          {linkTitle}
        </a>
      </div>
    </div>
  )
}
