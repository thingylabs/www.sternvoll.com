import { useState } from 'preact/hooks'
import { AddToCart } from '@/islands/AddToCart.tsx'
import { formatCurrency } from '@/utils/data.ts'
import { Product } from '@/utils/types.ts'
import { categories } from '@/config/productCategories.ts'

export default function ProductDetails({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants.nodes[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)

  // Function to change the main image
  function changeImage(index: number) {
    if (!product.images || !product.images.nodes) return
    if (index < 0) {
      index = product.images.nodes.length - 1
    } else if (index >= product.images.nodes.length) {
      index = 0
    }
    setCurrentImageIndex(index)
  }

  // Handlers for touch events
  const handleTouchStart = (e: TouchEvent) => setStartX(e.touches[0].clientX)

  const handleTouchEnd = (e: TouchEvent) => {
    if (startX === null) return
    const endX = e.changedTouches[0].clientX
    const deltaX = startX - endX
    if (deltaX > 50) changeImage(currentImageIndex + 1) // Swipe left
    else if (deltaX < -50) changeImage(currentImageIndex - 1) // Swipe right
    setStartX(null)
  }

  // Function to determine the breadcrumb category
  const getCategory = () => {
    for (const category of categories) {
      if (product.tags!.includes(category.label)) return category
    }
    return null
  }

  const category = getCategory()

  // Utility to split the description into titles and contents
  function parseDescription(descriptionHtml: string) {
    if (!descriptionHtml) return []
    const paragraphs = descriptionHtml
      .split('</p>')
      .map((p) => p.replace(/<[^>]+>/g, '').trim()) // Remove HTML tags
      .filter((p) => p)
    return paragraphs.slice(1).map((para) => {
      const [title, ...rest] = para.split(':')
      return { title: title?.trim(), content: rest.join(':').trim() }
    })
  }

  const accordions = parseDescription(product.descriptionHtml)

  return (
    <div class='w-11/12 xl:max-w-[80vw] mx-auto mt-8 grid gap-8 md:grid-cols-2'>
      {/* Product image */}
      <div class='relative'>
        <div
          class='aspect-square w-full bg-white rounded-xl border-2 border-gray-200'
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          <div class='rounded-lg overflow-hidden relative'>
            {product.images && product.images.nodes[currentImageIndex] && (
              <img
                id='productImage'
                src={product.images.nodes[currentImageIndex].url}
                alt={product.images.nodes[currentImageIndex].altText}
                class='w-full h-full object-center object-contain'
              />
            )}

            {/* Navigation Arrows */}
            <button
              class='absolute inset-y-1/2 transform -translate-y-1/2 w-16 opacity-50 hover:opacity-100 flex items-center justify-center left-0'
              onClick={() => changeImage(currentImageIndex - 1)}
            >
              <span class='inline-flex items-center justify-center w-10 h-10 xl:w-[2.5vw] xl:h-[2.5vw] rounded-full bg-white/30 hover:bg-white/50'>
                <svg
                  aria-hidden='true'
                  class='w-6 h-6 text-gray-800 xl:w-[2vw] xl:h-[2vw]'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                <span class='sr-only'>Previous</span>
              </span>
            </button>
            <button
              class='absolute inset-y-1/2 transform -translate-y-1/2 w-16 opacity-50 hover:opacity-100 flex items-center justify-center right-0'
              onClick={() => changeImage(currentImageIndex + 1)}
            >
              <span class='inline-flex items-center justify-center w-10 h-10 xl:w-[2.5vw] xl:h-[2.5vw] rounded-full bg-white/30 hover:bg-white/50'>
                <svg
                  aria-hidden='true'
                  class='w-6 h-6 text-gray-800 xl:w-[2vw] xl:h-[2vw]'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M9 5l7 7-7 7'
                  />
                </svg>
                <span class='sr-only'>Next</span>
              </span>
            </button>
          </div>
        </div>

        {/* Image Previews */}
        <div class='mt-4 grid grid-cols-4 md:grid-cols-2 gap-2'>
          {product.images &&
            product.images.nodes.map((image, index) => (
              <button
                key={index}
                onClick={() => changeImage(index)}
                class={`aspect-square w-full border-2 ${
                  currentImageIndex === index
                    ? 'border-gray-800'
                    : 'border-gray-300'
                } rounded-lg overflow-hidden`}
              >
                <img
                  src={image.url}
                  alt={image.altText}
                  class='w-full h-full object-cover'
                />
              </button>
            ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div class='xl:text-[1.1vw]'>
        {/* Breadcrumb */}
        <nav class='my-4 text-sm xl:text-[0.9vw] text-gray-500 flex justify-center md:justify-start'>
          <a href='/' class='mr-2'>Home</a> &gt;{' '}
          <a href='#' class='mx-2'>All Jewelry</a>
          {category && (
            <>
              {' '} &gt;{' '}
              <a href={category.link ?? '#'} class='ml-2'>{category.label}</a>
            </>
          )}
        </nav>

        {/* Product Title and Price */}
        <div class='flex flex-col items-center md:items-start gap-2 text-center md:text-left'>
          <h1 class='text-2xl lg:text-3xl xl:text-[1.75vw] font-semibold text-gray-800'>
            {product.title}
          </h1>
          <div class='text-xl xl:text-[1.5vw] font-thin tracking-wide'>
            {formatCurrency(variant.priceV2)}
          </div>
        </div>

        {/* Availability and Description */}
        <section aria-labelledby='information-heading' class='mt-4'>
          <h2 id='information-heading' class='sr-only'>Product information</h2>
          {!variant.availableForSale && (
            <p class='text-base text-red-500 xl:text-[1vw]'>Out of stock</p>
          )}
          <p class='mt-2 text-base text-gray-600 xl:text-[1.3vw] xl:leading-normal'>
            {product.descriptionHtml?.split('</p>')[0].replace(/<[^>]+>/g, '')}
          </p>
        </section>

        {/* Product Form */}
        <section aria-labelledby='options-heading' class='pt-4'>
          {product.variants.nodes.length > 1 && (
            <div class='group'>
              <div class='relative p-4 flex items-center justify-between rounded-lg border-2 border-gray-300 group-hover:border-gray-400 transition-colors'>
                <span>{/* space holderplace, don't remove */}</span>
                <span class='text-gray-400 group-hover:text-gray-600 transition-colors'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5 5.85716L8 3.00002L11 5.85716'
                      stroke='currentColor'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M11 10.1429L8 13L5 10.1429'
                      stroke='currentColor'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </span>
                <select
                  onChange={(e) =>
                    setVariant(
                      JSON.parse((e.target as HTMLSelectElement).value),
                    )}
                  class='absolute pl-4 top-0 left-0 block w-full h-full rounded-lg appearance-none bg-transparent cursor-pointer'
                >
                  {product.variants.nodes.map((variant) => {
                    return (
                      <option value={JSON.stringify(variant)}>
                        {variant.title}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          )}
          {variant.availableForSale && (
            <div class='mt-4'>
              <AddToCart id={variant.id} />
            </div>
          )}
        </section>

        {/* Additional Information Accordion */}
        {accordions.length > 0 && (
          <section class='mt-8'>
            <h3 class='text-lg font-semibold mb-4'>Additional Information</h3>
            {accordions.map(({ title, content }, index) => (
              <details key={index} class='border rounded-lg'>
                <summary class='p-4 bg-gray-100 cursor-pointer'>
                  {title}
                </summary>
                <div class='p-4 text-gray-600'>{content}</div>
              </details>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
