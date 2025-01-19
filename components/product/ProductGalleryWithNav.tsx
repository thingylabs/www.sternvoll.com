// components/product/ProductGalleryWithNav.tsx
import ProductImageGallery from '@/islands/ProductImageGallery.tsx'
import { BreadcrumbNav } from './ProductComponents.tsx'
import type { Product } from '@/utils/types.ts'

interface ProductGalleryWithNavProps {
  product: Product
  category: ReturnType<
    typeof import('@/hooks/useProductCategories.ts').useProductCategories
  >
}

export function ProductGalleryWithNav({
  product,
  category,
}: ProductGalleryWithNavProps) {
  return (
    <div class='relative'>
      {/* Breadcrumb with improved visibility */}
      <div class='absolute top-4 left-6 right-6 z-10'>
        <div class='bg-white/80 backdrop-blur-sm rounded-md py-2 px-4 inline-block shadow-sm'>
          <BreadcrumbNav category={category} />
        </div>
      </div>

      {/* Main Product Gallery */}
      <ProductImageGallery product={product} />
    </div>
  )
}
