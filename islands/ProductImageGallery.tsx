// islands/ProductImageGallery.tsx
import { useSignal } from '@preact/signals'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import type { Product } from '@/utils/types.ts'

interface ProductImageGalleryProps {
  product: Product
}

export default function ProductImageGallery({
  product,
}: ProductImageGalleryProps) {
  const currentImageIndex = useSignal(0)
  const startX = useSignal<number | null>(null)
  const images = product.images?.nodes || []

  const handleTouchStart = (e: TouchEvent) => {
    if (!e.touches[0]) return
    startX.value = e.touches[0].clientX
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (startX.value === null || !e.changedTouches[0]) return
    const endX = e.changedTouches[0].clientX
    const deltaX = startX.value - endX

    if (deltaX > 50) {
      currentImageIndex.value = (currentImageIndex.value + 1) % images.length
    } else if (deltaX < -50) {
      currentImageIndex.value = currentImageIndex.value === 0
        ? images.length - 1
        : currentImageIndex.value - 1
    }
    startX.value = null
  }

  const handlePrevImage = () => {
    currentImageIndex.value = currentImageIndex.value === 0
      ? images.length - 1
      : currentImageIndex.value - 1
  }

  const handleNextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }

  const currentImage = images[currentImageIndex.value]

  return (
    <div class='relative'>
      <div
        class='aspect-square w-full bg-white'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div class='overflow-hidden relative'>
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

          <button
            onClick={handlePrevImage}
            class='absolute bottom-4 left-4 opacity-50 hover:opacity-100 transition-opacity'
            aria-label='Previous image'
          >
            <span class='inline-flex items-center justify-center w-10 h-10 xl:w-[2.5vw] xl:h-[2.5vw] rounded-full bg-white/70 hover:bg-white/90'>
              <svg
                aria-hidden='true'
                class='w-6 h-6 text-gray-800 xl:w-[1.5vw] xl:h-[1.5vw]'
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
            onClick={handleNextImage}
            class='absolute bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity'
            aria-label='Next image'
          >
            <span class='inline-flex items-center justify-center w-10 h-10 xl:w-[2.5vw] xl:h-[2.5vw] rounded-full bg-white/70 hover:bg-white/90'>
              <svg
                aria-hidden='true'
                class='w-6 h-6 text-gray-800 xl:w-[1.5vw] xl:h-[1.5vw]'
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
        </div>
      </div>
    </div>
  )
}
