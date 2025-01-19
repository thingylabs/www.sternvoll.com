// components/product/ImageComponents.tsx
import type { ImageGridProps, NavButtonsProps } from './types.ts'

export function ImageNavButtons(
  { onImageChange, currentIndex }: NavButtonsProps,
) {
  return (
    <>
      <button
        class='absolute bottom-4 left-4 opacity-50 hover:opacity-100 transition-opacity'
        onClick={() => onImageChange(currentIndex - 1)}
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
        class='absolute bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity'
        onClick={() => onImageChange(currentIndex + 1)}
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
    </>
  )
}

export function ImageThumbnails(_props: ImageGridProps) {
  return <></>
}
