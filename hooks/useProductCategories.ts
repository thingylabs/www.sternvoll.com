// hooks/useProductCategories.ts
import type { Product } from '@/utils/types.ts'
import { categories } from '@/config/productCategories.ts'

export function useProductCategories(product: Product) {
  const getCategory = () => {
    for (const category of categories) {
      if (product.tags?.includes(category.label)) return category
    }
    return null
  }

  return getCategory()
}
