// components/product/types.ts
export interface ShopifyImage {
  jpg_square?: string
  jpg_square_2x?: string
  webp_square?: string
  webp_square_2x?: string
  altText?: string
}

export interface ImageGridProps {
  images: ShopifyImage[]
  currentImageIndex: number
  onImageChange: (index: number) => void
}

export interface NavButtonsProps {
  onImageChange: (index: number) => void
  currentIndex: number
}
