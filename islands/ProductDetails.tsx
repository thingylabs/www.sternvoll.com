// islands/ProductDetails.tsx
import { useState } from 'preact/hooks'
import { AddToCart } from '@/islands/AddToCart.tsx'
import { formatCurrency } from '@/utils/data.ts'
import { ImageFormat, Product } from '@/utils/types.ts'
import { categories } from '@/config/productCategories.ts'
import type { CountryCode } from '@/config/locales.ts'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'
import {
  JoinWaitlist,
  translationKeys as joinWaitlistTranslationKeys,
} from '@/islands/JoinWaitlist.tsx'
import { TranslationMap } from '@/translations.ts'
import { PreloadSrcsets } from '@/islands/PreloadSrcsets.tsx'
import { useMemo } from 'preact/hooks'

export const translationKeys = [
  ...joinWaitlistTranslationKeys,
] as const

export function ProductDetails(
  { product, country, t, imageFormat }: {
    product: Product
    country: CountryCode
    t: TranslationMap
    imageFormat: ImageFormat
  },
) {
  const [variant, setVariant] = useState(product.variants.nodes[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)
  const [chosenOptions, setChosenOptions] = useState<[string?, string?]>([])

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
  const image = product.images && product.images.nodes[currentImageIndex]

  const preloadSrcsets = useMemo(() => {
    return product.images?.nodes.map((image) => {
      return imageFormat !== 'jpg'
        ? `${image.webp_square} 1x, ${image.webp_square_2x} 2x`
        : `${image.jpg_square} 1x, ${image.jpg_square_2x} 2x`
    }) || []
  }, [product, imageFormat])

  return (
    <div class='w-11/12 xl:max-w-[80vw] mx-auto grid gap-8 md:grid-cols-2'>
      <PreloadSrcsets srcsets={preloadSrcsets} />

      {/* Product image */}
      <div class='relative'>
        <div
          class='aspect-square w-full bg-white rounded-xl border-2 border-gray-200'
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          <div class='rounded-lg overflow-hidden relative'>
            {image && (
              <ResponsiveImage
                src={image.jpg_square!}
                alt={image.altText}
                class='w-full h-full object-center object-contain'
                width={400}
                height={400}
                shopify={{
                  'webp': {
                    'default': image.webp_square!,
                    '2x': image.webp_square_2x!,
                  },
                  'jpg': {
                    'default': image.jpg_square!,
                    '2x': image.jpg_square_2x!,
                  },
                }}
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
                <ResponsiveImage
                  src={image.jpg_square!}
                  alt={image.altText}
                  class='w-full h-full object-cover'
                  width={400}
                  height={400}
                  shopify={{
                    'webp': {
                      'default': image.webp_square!,
                      '2x': image.webp_square_2x!,
                    },
                    'jpg': {
                      'default': image.jpg_square!,
                      '2x': image.jpg_square_2x!,
                    },
                  }}
                />
              </button>
            ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div class='xl:text-[1.1vw]'>
        {/* Breadcrumb */}
        <nav
          class={`my-4 text-sm xl:text-base text-gray-500 flex justify-center md:justify-start
        2xl:text-[1vw]`}
        >
          <a href='/' class='mr-2'>Home</a> &gt;{' '}
          <a href='/collections/all' class='mx-2'>All Jewelry</a>
          {category && (
            <>
              {' '} &gt;{' '}
              <a href={`/collections/${category.link}`} class='ml-2'>
                {category.label}
              </a>
            </>
          )}
        </nav>

        {/* Product Title and Price */}
        <div class='flex flex-col items-center md:items-start gap-2 text-center md:text-left'>
          <h1
            class={`text-2xl lg:text-3xl xl:text-[1.75vw] font-semibold text-gray-800
          2xl:mt-[2vw]`}
          >
            {product.title}
          </h1>
          <div class='text-xl xl:text-[1vw] font-thin tracking-wide 2xl:mt-[2vw]'>
            {formatCurrency(variant.priceV2)}
          </div>
        </div>

        {/* Availability and Description */}
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

        {/* Product Form */}
        <section aria-labelledby='options-heading' class='pt-4 2xl:mt-[2vw]'>
          <div>
            {(product.options || []).map((option, isSecondRow) => {
              return (
                <>
                  <div className='flex items-start w-full'>
                    <div className='flex-none w-24 font-bold p-2'>
                      {option.name}
                    </div>
                    <div className='flex flex-wrap items-start'>
                      {option.values.map((value, notFirstOption) => (
                        <div
                          style='text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);'
                          className={`border-2 cursor-pointer border-secondary border-solid p-2 mr-2 rounded-md  ${
                            chosenOptions.includes(value) ||
                              !chosenOptions.length && !notFirstOption
                              ? 'bg-secondary !border-primary text-shadow-white'
                              : ''
                          } ${isSecondRow ? 'mt-2' : ''}`}
                          onClick={(_) => {
                            let variant
                            if (
                              product.options!.length === 2 &&
                              !chosenOptions.length
                            ) {
                              variant = findNode(
                                product,
                                product.options![0].values[0],
                                value,
                              )
                              setChosenOptions([
                                product.options![0].values[0],
                                value,
                              ])
                            } else {
                              variant = findNode(product, value)
                              setChosenOptions([
                                chosenOptions[0],
                                value,
                              ])
                            }
                            setVariant(variant!)
                          }}
                        >
                          {option.name === 'Color' && (
                            <span
                              className={`border inline-block w-6 h-6 rounded-full mr-2 align-middle shadow-inner ${
                                value === 'Gold'
                                  ? 'bg-yellow-300'
                                  : value === 'Rose gold'
                                  ? 'bg-pink-200'
                                  : value === 'White gold'
                                  ? 'bg-white'
                                  : value === 'Silver'
                                  ? 'bg-gray-200'
                                  : ''
                              } ${
                                chosenOptions.includes(value) ||
                                  !chosenOptions.length && !notFirstOption
                                  ? '!border-primary'
                                  : 'border-secondary'
                              }`}
                              style={{
                                backgroundImage: `
                                  linear-gradient(
                                    -45deg,
                                    transparent 20%,
                                    rgba(255,255,255,0.7) 35%,
                                    transparent 50%,
                                    transparent 60%,
                                    rgba(255,255,255,0.7) 75%,
                                    transparent 90%
                                  )
                                `,
                              }}
                            />
                          )}
                          <span className='align-middle'>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )
            })}
          </div>

          {variant.availableForSale
            ? (
              <div class='mt-4'>
                <AddToCart id={variant.id} country={country} />
              </div>
            )
            : (
              <div class='mt-4'>
                <JoinWaitlist productTitle={product.title} t={t} />
              </div>
            )}
        </section>

        {/* Additional Information Accordion */}
        {accordions.length > 0 && (
          <section class='mt-8'>
            <h3 class='text-lg font-semibold mb-4 2xl:text-[1vw] 2xl:py-[2vw]'>
              Additional Information
            </h3>
            {accordions.map(({ title, content }, index) => (
              <details
                key={index}
                class='border border-tertiary-darker rounded-lg xl:text-base'
              >
                <summary class='p-4 bg-tertiary cursor-pointer 2xl:text-[1vw] 2xl:p-[1.25vw]'>
                  {title}
                </summary>
                <div class='p-4 bg-tertiary pt-0 2xl:text-[1vw] 2xl:leading-normal'>
                  {content}
                </div>
              </details>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

function findNode(product: Product, v1: string, v2 = '') {
  return product.variants.nodes.find((node) => {
    if (v2 !== '') {
      return node.selectedOptions![0].value === v1 &&
        node.selectedOptions![1].value === v2
    }
    return node.selectedOptions![0].value === v1
  })
}
