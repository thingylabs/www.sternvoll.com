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
  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (startX === null) return
    const endX = e.changedTouches[0].clientX
    const deltaX = startX - endX

    // Check if the swipe is significant enough to change the image
    if (deltaX > 50) {
      // Swipe left
      changeImage(currentImageIndex + 1)
    } else if (deltaX < -50) {
      // Swipe right
      changeImage(currentImageIndex - 1)
    }

    setStartX(null)
  }

  // Function to determine the breadcrumb category
  const getCategory = () => {
    for (const category of categories) {
      if (product.tags!.includes(category.label)) {
        return category
      }
    }
    return null
  }

  const category = getCategory()

  // Utility to split the description into titles and contents
  function parseDescription(descriptionHtml: string) {
    if (!descriptionHtml) return []

    // Split by paragraph tags and filter out empty entries
    const paragraphs = descriptionHtml
      .split('</p>')
      .map((p) => p.replace(/<[^>]+>/g, '').trim()) // Remove HTML tags and trim
      .filter((p) => p)

    // Skip the first paragraph and process the rest
    const accordions = paragraphs.slice(1).map((para) => {
      const [title, ...rest] = para.split(':')
      const content = rest.join(':').trim()
      return { title: title?.trim(), content }
    })

    return accordions
  }

  const accordions = parseDescription(product.descriptionHtml)

  return (
    <div class='w-11/12 max-w-5xl mx-auto mt-8 lg:grid lg:grid-cols-2 lg:gap-x-16'>
      {/* Product image */}
      <div class='relative'>
        <div
          class='aspect-square w-full bg-white rounded-xl border-2 border-gray-200'
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          <div class='rounded-lg overflow-hidden'>
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
              class='absolute w-16 opacity-50 hover:opacity-100 top-0 bottom-0 flex items-center justify-center left-0'
              onClick={() => changeImage(currentImageIndex - 1)}
            >
              <span class='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50'>
                <svg
                  aria-hidden='true'
                  class='w-6 h-6 text-gray-800'
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
              class='absolute w-16 opacity-50 hover:opacity-100 top-0 bottom-0 flex items-center justify-center right-0'
              onClick={() => changeImage(currentImageIndex + 1)}
            >
              <span class='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50'>
                <svg
                  aria-hidden='true'
                  class='w-6 h-6 text-gray-800'
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
        <div class='mt-4 flex space-x-2'>
          {product.images &&
            product.images.nodes.map((image, index) => (
              <button
                key={index}
                onClick={() => changeImage(index)}
                class={`w-16 h-16 border-2 ${
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

      {/* Breadcrumb */}
      <nav class='my-8 text-sm text-gray-500 flex justify-center'>
        <a href='/' class='mr-2'>Home</a> &gt;{' '}
        <a href='#' class='mx-2'>All Jewelry</a>
        {category && (
          <>
            {' '}
            &gt;{' '}
            <a href={category.link ?? '#'} class='ml-2'>{category.label}</a>
          </>
        )}
      </nav>

      {/* Product details */}
      <div class='mt-6'>
        <div class='flex flex-col items-center gap-2 text-center'>
          <h1 class='text-2xl lg:text-3xl font-semibold text-gray-800'>
            {product.title}
          </h1>
          <div class='px-8 py-6 text-xl font-thin	tracking-wide'>
            {formatCurrency(variant.priceV2)}
          </div>
        </div>{' '}
        <section
          aria-labelledby='information-heading'
          class=''
        >
          <h2 id='information-heading' class='sr-only'>
            Product information
          </h2>

          {!variant.availableForSale && (
            <div class='flex justify-center'>
              <p class='text-base text-gray-500'>Out of stock</p>
            </div>
          )}

          {/* Display only the first paragraph of the description */}
          <div class='mt-2'>
            <p class='text-base text-gray-600'>
              {product.descriptionHtml
                ?.split('</p>')[0]
                .replace(/<[^>]+>/g, '')
                .split(': ')[1]}
            </p>
          </div>
        </section>
      </div>

      {/* Product form */}
      <div class='mt-12 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start'>
        <section aria-labelledby='options-heading'>
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
      </div>

      {/* Additional Information Section */}
      {accordions.length > 0 && (
        <section class='mt-8'>
          <h3 class='text-lg font-semibold text-gray-800 mb-4'>
            Additional Information
          </h3>
          <div class='space-y-4'>
            {accordions.map(({ title, content }, index) => (
              <details key={index} class='border rounded-lg'>
                <summary class='p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg'>
                  {title}
                </summary>
                <div class='p-4 text-gray-600'>{content}</div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
