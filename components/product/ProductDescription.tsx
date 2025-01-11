// components/product/ProductDescription.tsx
import type { Product } from '@/utils/types.ts'

interface ProductDescriptionProps {
  product: Product
  variant: Product['variants']['nodes'][0]
}

export function ProductDescription(
  { product, variant }: ProductDescriptionProps,
) {
  return (
    <section aria-labelledby='information-heading' class='mt-4'>
      <h2 id='information-heading' class='sr-only'>Product information</h2>
      {!variant.availableForSale && (
        <p class='text-base text-red-500 pb-2 xl:text-[1.5vw] 2xl:mt-[2vw]'>
          Out of stock
        </p>
      )}
      <p class='mt-2 text-base text-gray-600 xl:text-[1.3vw] xl:leading-normal 2xl:text-[1vw] 2xl:mt-[2vw]'>
        {product.descriptionHtml?.split('</p>')[0].replace(/<[^>]+>/g, '')}
      </p>
    </section>
  )
}
