// components/product/ProductImageGallery.tsx
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
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

  return (
    <div class='relative'>
      <div
        class='aspect-square w-full'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div class='overflow-hidden relative'>
          {images.map((image) => (
            image.jpg_square && (
              <ResponsiveImage
                src={image.jpg_square}
                alt={image.altText || ''}
                class='w-full h-full object-center object-contain py-2 pt-4'
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
            )
          ))}
        </div>
      </div>
    </div>
  )
}
