// routes/[[lang]]/products/[product].tsx
import { Handlers, PageProps } from '$fresh/server.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { graphql } from '@/utils/shopify.ts'
import { Product } from '@/utils/types.ts'
import { SelectedWorks } from '@/components/SelectedWorks.tsx'
import { State } from '@/routes/_middleware.ts'
import { meta as siteMeta } from '@/config/meta.ts'
import {
  ProductDetails,
  translationKeys as productDetailsTranslationKeys,
} from '@/islands/ProductDetails.tsx'
import { productQuery, relatedProductsQuery } from './_queries.ts'

interface Query {
  product: Product | null
  relatedProducts: Product[]
}

export const handler: Handlers<Query, State> = {
  async GET(_req, ctx) {
    try {
      const data = await graphql<Query>(
        productQuery,
        { product: ctx.params.product },
        ctx.state.geo.lang,
      )
      if (!data.product) {
        return new Response('Product not found', { status: 404 })
      }

      const tags = data.product.tags ? data.product.tags.join(' ') : ''
      const relatedData = await graphql<
        { products: { edges: { node: Product }[] } }
      >(
        relatedProductsQuery,
        { query: tags },
        ctx.state.geo.lang,
      )

      const relatedProducts = relatedData.products.edges
        .filter((edge) => edge.node.handle !== ctx.params.product)
        .map((edge) => edge.node)

      return ctx.render({
        product: data.product,
        relatedProducts,
      })
    } catch (error) {
      console.error('Error fetching product data:', error)
      return new Response('Error fetching product data', { status: 500 })
    }
  },
}

export default function ProductPage(ctx: PageProps<Query, State>) {
  const { data, url, state } = ctx
  const getT = state.geo.getT
  const t = getT()

  if (!data.product) {
    return <div>{t['Product not found']}</div>
  }

  const meta = {
    ...siteMeta,
    locale: state.geo.locale,
    description: data.product.description,
    lang: state.geo.lang,
    image: {
      url: data.product.featuredImage!.jpg_small!,
      width: data.product.featuredImage!.width,
      height: data.product.featuredImage!.height,
      alt: data.product.featuredImage!.altText,
    },
    title: data.product.title,
    price: data.product.priceRange.minVariantPrice.amount,
    currency: data.product.priceRange.minVariantPrice.currencyCode,
  }

  return (
    <>
      <Meta url={url} meta={meta} />
      <div class='bg-primary h-[74px] md:h-[107px] w-full'></div>

      <div class='px-4'>
        <ProductDetails
          product={data.product!}
          country={ctx.state.geo.country}
          t={getT(productDetailsTranslationKeys)}
          imageFormat={state.imageFormat}
        />
      </div>

      <div class='px-4 md:px-8 lg:px-12 xl:px-0 xl:max-w-[80vw] mx-auto 2xl:pt-[5vw]'>
        <div class='mt-16'>
          <SelectedWorks
            title='Related jewelry'
            products={data.relatedProducts}
            lang={state.geo.lang}
          />
        </div>

        <div class='back-to-shop mt-12 xl:text-base 2xl:text-[1vw]'>
          <a
            href='/'
            class='flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-200'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              class='xl:w-[1vw] xl:h-[1vw]'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.65 3.35C4.92 3.08 5.36 3.08 5.64 3.35C5.91 3.62 5.91 4.07 5.64 4.34L2.69 7.28H15.28C15.67 7.28 16 7.6 16 8C16 8.4 15.67 8.72 15.28 8.72H2.69L5.64 11.67C5.91 11.94 5.91 12.38 5.64 12.66C5.36 12.92 4.92 12.92 4.65 12.66L0.35 8.35C0.16 8.16 0.16 7.84 0.35 7.65L4.65 3.35Z'
                fill='currentColor'
              />
            </svg>
            Back to shop
          </a>
        </div>
      </div>

      <Footer meta={meta} t={t} />
    </>
  )
}
