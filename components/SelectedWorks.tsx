import { ProductCard } from '@/components/ProductCard.tsx'
import { Product } from '../utils/types.ts'

interface SelectedWorksProps {
  products: Product[]
}

export function SelectedWorks({ products }: SelectedWorksProps) {
  return (
    <section>
      <h2 class='text-2xl font-accent'>Selected works:</h2>
      <div class='grid grid-cols-1 gap-8'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
