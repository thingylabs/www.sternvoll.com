// components/RelatedProducts.tsx

import { Product } from '@/utils/types.ts'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {products.map((product) => (
        <a
          href={`/products/${product.handle}`}
          key={product.handle}
          class='block p-4 border rounded-lg hover:shadow-md transition-shadow duration-300'
        >
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              class='w-full h-48 object-cover rounded-md mb-2'
            />
          )}
          <h3 class='text-lg font-semibold'>{product.title}</h3>
          {product.variants.nodes[0] && (
            <p class='text-gray-700'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: product.variants.nodes[0].priceV2.currencyCode,
              }).format(
                parseFloat('' + product.variants.nodes[0].priceV2.amount),
              )}
            </p>
          )}
        </a>
      ))}
    </div>
  )
}
