// islands/ProductDetails.tsx
import { useState } from 'preact/hooks'
import { AddToCart } from '@/islands/AddToCart.tsx'
import { useProductVariants } from '@/hooks/useProductVariants.ts'
import { useProductCategories } from '@/hooks/useProductCategories.ts'
import { ProductImageGallery } from '@/components/product/ProductImageGallery.tsx'
import { ProductOptions } from '@/components/product/ProductOptions.tsx'
import { ProductDescription } from '@/components/product/ProductDescription.tsx'
import { PreloadSrcsets } from '@/islands/PreloadSrcsets.tsx'
import { useMemo } from 'preact/hooks'
import type { ImageFormat, Product } from '@/utils/types.ts'
import type { CountryCode } from '@/config/locales.ts'
import type { TranslationMap } from '@/translations.ts'
import {
  JoinWaitlist,
  translationKeys as joinWaitlistTranslationKeys,
} from '@/islands/JoinWaitlist.tsx'
import {
  AdditionalInformation,
  BreadcrumbNav,
  ProductHeader,
} from '@/components/product/ProductComponents.tsx'

export const translationKeys = [
  ...joinWaitlistTranslationKeys,
] as const

export interface ProductDetailsProps {
  product: Product
  country: CountryCode
  t: TranslationMap
  imageFormat: ImageFormat
}

export function ProductDetails({
  product,
  country,
  t,
  imageFormat,
}: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const {
    variant,
    chosenOptions,
    handleOptionSelect,
  } = useProductVariants(product)

  const category = useProductCategories(product)

  const preloadSrcsets = useMemo(() => {
    return product.images?.nodes.map((image) => {
      return imageFormat !== 'jpg'
        ? `${image.webp_square} 1x, ${image.webp_square_2x} 2x`
        : `${image.jpg_square} 1x, ${image.jpg_square_2x} 2x`
    }) || []
  }, [product, imageFormat])

  const changeImage = (index: number) => {
    if (!product.images?.nodes) return
    if (index < 0) {
      index = product.images.nodes.length - 1
    } else if (index >= product.images.nodes.length) {
      index = 0
    }
    setCurrentImageIndex(index)
  }

  return (
    <div class='w-11/12 xl:max-w-[80vw] mx-auto grid gap-8 md:grid-cols-2'>
      <PreloadSrcsets srcsets={preloadSrcsets} />

      <ProductImageGallery
        product={product}
        currentImageIndex={currentImageIndex}
        onImageChange={changeImage}
      />

      <div class='xl:text-[1.1vw]'>
        <BreadcrumbNav category={category} />

        <ProductHeader
          title={product.title}
          price={variant.priceV2}
        />

        <ProductDescription product={product} variant={variant} />

        <section aria-labelledby='options-heading' class='pt-4 2xl:mt-[2vw]'>
          <ProductOptions
            product={product}
            chosenOptions={chosenOptions}
            onOptionSelect={handleOptionSelect}
          />

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

        <AdditionalInformation product={product} />
      </div>
    </div>
  )
}
