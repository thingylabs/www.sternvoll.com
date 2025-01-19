// islands/ProductGallerySection.tsx
import { Product } from '@/utils/types.ts'
import { useProductCategories } from '@/hooks/useProductCategories.ts'
import { ProductGalleryWithNav } from '@/components/product/ProductGalleryWithNav.tsx'

interface ProductGallerySectionProps {
  product: Product
}

export default function ProductGallerySection(
  { product }: ProductGallerySectionProps,
) {
  const category = useProductCategories(product)

  return (
    <ProductGalleryWithNav
      product={product}
      category={category}
    />
  )
}
