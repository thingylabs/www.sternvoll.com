import { ProductCard } from '@/components/ProductCard.tsx'
import { Product } from '@/utils/types.ts'

interface SelectedWorksProps {
  products: Product[]
}

export function SelectedWorks({ products }: SelectedWorksProps) {
  return (
    <section>
      <h2 class='text-2xl md:text-4xl font-accent'>Selected works:</h2>
      <div class='grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
