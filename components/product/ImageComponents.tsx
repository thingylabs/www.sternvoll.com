// components/product/ImageComponents.tsx
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'

interface ShopifyImage {
  jpg_square?: string
  jpg_square_2x?: string
  webp_square?: string
  webp_square_2x?: string
  altText?: string
}

interface NavButtonsProps {
  onImageChange: (index: number) => void
  currentIndex: number
}

export function ImageNavButtons(
  { onImageChange, currentIndex }: NavButtonsProps,
) {
  return (
    <>
      <button
        class='absolute inset-y-1/2 transform -translate-y-1/2 w-16 opacity-50 hover:opacity-100 flex items-center justify-center left-0'
        onClick={() => onImageChange(currentIndex - 1)}
        aria-label='Previous image'
      >
        <span class='inline-flex items-center justify-center w-10 h-10 xl:w-[2.5vw] xl:h-[2.5vw] rounded-full bg-white/30 hover:bg-white/50'>
          <svg
            aria-hidden='true'
            class='w-6 h-6 text-gray-800 xl:w-[2vw] xl:h-[2vw]'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </span>
      </button>
      <button
        class='absolute inset-y-1/2 transform -translate-y-1/2 w-16 opacity-50 hover:opacity-100 flex items-center justify-center right-0'
        onClick={() => onImageChange(currentIndex + 1)}
        aria-label='Next image'
      >
        <span class='inline-flex items-center justify-center w-10 h-10 xl:w-[2.5vw] xl:h-[2.5vw] rounded-full bg-white/30 hover:bg-white/50'>
          <svg
            aria-hidden='true'
            class='w-6 h-6 text-gray-800 xl:w-[2vw] xl:h-[2vw]'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </span>
      </button>
    </>
  )
}

interface ImageThumbnailsProps {
  images: ShopifyImage[]
  currentImageIndex: number
  onImageChange: (index: number) => void
}

export function ImageThumbnails({
  images,
  currentImageIndex,
  onImageChange,
}: ImageThumbnailsProps) {
  return (
    <div class='mt-4 grid grid-cols-4 md:grid-cols-2 gap-2'>
      {images.map((image, index) => (
        image.jpg_square && (
          <button
            key={index}
            onClick={() => onImageChange(index)}
            class={`aspect-square w-full border-2 ${
              currentImageIndex === index
                ? 'border-gray-800'
                : 'border-gray-300'
            } rounded-lg overflow-hidden`}
          >
            <ResponsiveImage
              src={image.jpg_square}
              alt={image.altText || ''}
              class='w-full h-full object-cover'
              width={400}
              height={400}
              shopify={{
                webp: {
                  default: image.webp_square || '',
                  '2x': image.webp_square_2x || '',
                },
                jpg: {
                  default: image.jpg_square,
                  '2x': image.jpg_square_2x || '',
                },
              }}
            />
          </button>
        )
      ))}
    </div>
  )
}
