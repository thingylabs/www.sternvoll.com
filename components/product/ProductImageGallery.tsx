// components/product/ProductImageGallery.tsx
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import { ImageNavButtons, ImageThumbnails } from './ImageComponents.tsx'
import { useState } from 'preact/hooks'
import type { Product } from '@/utils/types.ts'

interface ProductImageGalleryProps {
  product: Product
  currentImageIndex: number
  onImageChange: (index: number) => void
}

export function ProductImageGallery({
  product,
  currentImageIndex,
  onImageChange,
}: ProductImageGalleryProps) {
  const [startX, setStartX] = useState<number | null>(null)

  const handleTouchStart = (e: TouchEvent) => {
    if (!e.touches[0]) return
    setStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (startX === null || !e.changedTouches[0]) return
    const endX = e.changedTouches[0].clientX
    const deltaX = startX - endX
    if (deltaX > 50) onImageChange(currentImageIndex + 1)
    else if (deltaX < -50) onImageChange(currentImageIndex - 1)
    setStartX(null)
  }

  const images = product.images?.nodes || []
  const currentImage = images[currentImageIndex]

  return (
    <div class='relative'>
      <div
        class='aspect-square w-full bg-white rounded-xl border-2 border-gray-200'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div class='rounded-lg overflow-hidden relative'>
          {currentImage?.jpg_square && (
            <ResponsiveImage
              src={currentImage.jpg_square}
              alt={currentImage.altText || ''}
              class='w-full h-full object-center object-contain'
              width={400}
              height={400}
              shopify={{
                webp: {
                  default: currentImage.webp_square || '',
                  '2x': currentImage.webp_square_2x || '',
                },
                jpg: {
                  default: currentImage.jpg_square,
                  '2x': currentImage.jpg_square_2x || '',
                },
              }}
            />
          )}

          <ImageNavButtons
            onImageChange={onImageChange}
            currentIndex={currentImageIndex}
          />
        </div>
      </div>

      <ImageThumbnails
        images={images}
        currentImageIndex={currentImageIndex}
        onImageChange={onImageChange}
      />
    </div>
  )
}
