// components/product/ImageGrid.tsx
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import { ImageGridProps } from './types.ts'

export function ImageGrid(
  { images, currentImageIndex, onImageChange }: ImageGridProps,
) {
  return (
    <div class='grid grid-cols-4 md:grid-cols-2 border-t-2 border-primary'>
      {images.map((image, index) =>
        image.jpg_square && (
          <button
            key={index}
            onClick={() => onImageChange(index)}
            class='relative aspect-square w-full overflow-hidden'
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
            {currentImageIndex === index && (
              <div class='absolute inset-0 bg-black bg-opacity-25 p-2'>
                <div class='opacity-50 border-2 rounded h-full border-dashed border-tertiary' />
              </div>
            )}
          </button>
        )
      )}
    </div>
  )
}
