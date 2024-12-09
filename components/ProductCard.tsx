// components/ProductCard.tsx
import { formatCurrency } from '@/utils/data.ts'
import { IconCart } from '@/components/IconCart.tsx'
import { Product } from '@/utils/types.ts'
import { tags } from '@/config/tags.ts'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'

interface ProductCardProps {
  product: Product
  showcase?: boolean // Prop to apply taller styling
  lang: string
}

export function ProductCard(
  { product, showcase = false, lang = 'en' }: ProductCardProps,
) {
  const price = product.priceRange?.minVariantPrice?.amount ?? '0'
  const currencyCode = product.priceRange?.minVariantPrice?.currencyCode ??
    'USD'
  const formattedPrice = formatCurrency({
    amount: parseFloat('' + price),
    currencyCode,
  })
  const image = product.featuredImage!

  return (
    <div key={product.id} class='mb-4 xl:text-[1vw]'>
      <a
        href={`/${lang === 'en' ? '' : lang + '/'}products/${product.handle}`}
        class='group'
      >
        <div
          class={`relative bg-white overflow-hidden transition-all duration-500 ${
            showcase ? 'aspect-w-1 aspect-h-[1.3]' : 'aspect-w-1 aspect-h-1'
          }`}
        >
          {product.featuredImage && (
            <ResponsiveImage
              src={image.jpg_square!}
              alt={image.altText || product.title}
              width={361}
              height={361}
              class='absolute inset-0 w-full h-full object-center object-cover'
              shopify={{
                'webp': {
                  'default': image.webp_square!,
                  '1.5x': image.webp_square_1_5x!,
                  '2x': image.webp_square_2x!,
                },
                'jpg': {
                  'default': image.jpg_square!,
                  '1.5x': image.jpg_square_1_5x!,
                  '2x': image.jpg_square_2x!,
                },
              }}
            />
          )}
          <div class='absolute inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
            <IconCart size={30} />
          </div>
        </div>

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

      <div class='flex flex-wrap space-x-1 items-center'>
        {product.tags &&
          product.tags
            .filter(filterTags)
            .map(replace)
            .sort((a, b) => a.localeCompare(b))
            .map((tag, index) => (
              <a
                key={index}
                href={tags[tag]
                  ? tags[tag].url
                  : `/collections/${tag.toLowerCase()}`}
                class='hover:text-secondary text-gray-500 text-sm xl:text-base flex items-center'
              >
                {index !== 0 && (
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
