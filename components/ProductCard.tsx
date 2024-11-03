import { formatCurrency } from '@/utils/data.ts'
import { IconCart } from '@/components/IconCart.tsx'
import { Product } from '@/utils/types.ts'

export function ProductCard(props: { product: Product }) {
  const { product } = props

  // Ensure price and currency are defined, falling back to default values if necessary
  const price = product.priceRange?.minVariantPrice?.amount ?? '0'
  const currency = product.priceRange?.minVariantPrice?.currency ?? 'USD' // Default to 'USD'

  // Ensure currency is always valid and provided to the formatter
  const formattedPrice = formatCurrency({
    amount: parseFloat('' + price),
    currency,
  })

  return (
    <div key={product.id} class='mb-4 xl:text-[1.2vw]'>
      {/* Container for product and tags */}
      <a href={`/products/${product.handle}`} class='group'>
        <div class='relative bg-white overflow-hidden transition-all duration-500 aspect-w-1 aspect-h-1'>
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              class='absolute inset-0 w-full h-full object-center object-contain'
            />
          )}
          <div class='absolute inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
            <IconCart size={30} />
          </div>
        </div>

        {/* Title and Price Section */}
        <div class='flex items-center justify-between mt-2'>
          <h3 class='text-gray-800 relative uppercase font-bold truncate pr-2'>
            {product.title}
            <span class='bg-gray-800 h-[3px] w-0 group-hover:w-full absolute bottom-[-2px] left-0 transition-all duration-400' />
          </h3>
          <strong class='font-bold text-gray-800'>
            {formattedPrice}
          </strong>
        </div>
      </a>

      {/* Tags Section - moved outside the group */}
      <div class='flex flex-wrap space-x-1 items-center pt-2'>
        {product.tags &&
          product.tags
            .filter(filterTags)
            .map(replace)
            .sort((a, b) => a.localeCompare(b))
            .map((tag, index) => (
              <a
                key={index}
                href='#'
                class='hover:text-secondary text-gray-500 text-sm flex items-center xl:text-[1vw]'
              >
                {index !== 0 && ( // Render the dot only if it's not the first tag
                  <span class='w-1 h-1 bg-gray-400 rounded-full inline-block mx-1'>
                  </span>
                )}
                {tag}
              </a>
            ))}
      </div>
    </div>
  )
}

// Utility functions for filtering and replacing tags
function replace(tag: string) {
  if (tag === '925 Sterling Silver') {
    return '925 Silver'
  }
  return tag
}

function filterTags(tag: string) {
  if (
    tag === 'Non-Amazon' ||
    tag === 'Amazon - DE' ||
    tag === 'Imported by webBee' ||
    tag === 'IGI Certified'
  ) {
    return false
  }
  return true
}
