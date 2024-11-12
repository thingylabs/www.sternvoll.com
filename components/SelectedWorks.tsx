import { ProductCard } from '@/components/ProductCard.tsx'
import { Product } from '@/utils/types.ts'

interface SelectedWorksProps {
  products: Product[]
  title?: string
  showcase?: boolean // Prop to enable rhythmic showcasing
  lang?: string
}

export function SelectedWorks(
  { products, title = 'Selected works', showcase = false, lang = 'en' }:
    SelectedWorksProps,
) {
  return (
    <section>
      <h2 class='text-3xl md:text-4xl font-accent pb-2 2xl:text-[2.5vw] 2xl:pb-[1.5vw]'>
        {title}:
      </h2>
      <div class='grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4'>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            showcase={showcase && index % 2 === 0} // Apply taller style to every other item
            lang={lang}
          />
        ))}
      </div>
    </section>
  )
}
