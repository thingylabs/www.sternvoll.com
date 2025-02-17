// routes/[[lang]]/collections/[collection].tsx
import { Handlers, PageProps } from '$fresh/server.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { CollectionContent } from '@/islands/CollectionContent.tsx'
import { graphql } from '@/utils/shopify.ts'
import { Image, Product } from '@/utils/types.ts'
import type { State } from '@/routes/_middleware.ts'
import { meta as pageMeta } from '@/config/meta.ts'
import { srcset } from '@/utils/shopifySrcset.ts'

interface Query {
  collectionByHandle?: {
    title: string
    descriptionHtml: string
    image?: Image
    seo: {
      title: string
      description: string
    }
    products: {
      edges: { node: Product & { normalizedSales: number } }[]
    }
  }
  products?: {
    edges: { node: Product & { normalizedSales: number } }[]
  }
}

const q = `query ($collection: String!) {
  collectionByHandle(handle: $collection) {
    title
    descriptionHtml
    seo {
      title
      description
    }
    image {
      url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
      altText
      width
      height
    }
    products(first: 24, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            ${srcset('square', 400, 400)}
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            nodes {
              availableForSale
            }
          }
        }
      }
    }
  }
}`

const allProductsQuery = `query {
  products(first: 24, sortKey: BEST_SELLING) {
    edges {
      node {
        id
        title
        handle
        featuredImage {
          ${srcset('square', 400, 400)}
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            availableForSale
          }
        }
      }
    }
  }
}`

export const handler: Handlers<Query, State> = {
  async GET(_req, ctx) {
    const { collection } = ctx.params

    try {
      let data: Query
      if (collection === 'all') {
        data = await graphql<Query>(
          allProductsQuery,
          {},
          ctx.state.geo.lang,
        )
        if (!data.products) {
          return new Response('Collection not found', { status: 404 })
        }
      } else {
        data = await graphql<Query>(
          q,
          { collection: decodeURIComponent(collection) },
          ctx.state.geo.lang,
        )
        if (!data.collectionByHandle) {
          return new Response('Collection not found', { status: 404 })
        }
      }

      const products = collection === 'all'
        ? data.products!.edges.map((edge) => edge.node)
        : data.collectionByHandle!.products.edges.map((edge) => edge.node)

      const totalProducts = products.length
      const normalizedProducts = products.map((product, index) => {
        const normalizedSales = (totalProducts - index - 1) /
          (totalProducts - 1)
        return {
          ...product,
          normalizedSales: totalProducts === 1 ? 1 : normalizedSales,
        }
      })

      return ctx.render({
        collectionByHandle: {
          title: collection === 'all'
            ? 'All Products'
            : data.collectionByHandle!.title,
          descriptionHtml: collection === 'all'
            ? ''
            : data.collectionByHandle!.descriptionHtml,
          seo: collection === 'all'
            ? { title: 'All Products', description: 'Browse all products' }
            : data.collectionByHandle!.seo,
          image: collection === 'all'
            ? undefined
            : data.collectionByHandle!.image,
          products: { edges: normalizedProducts.map((node) => ({ node })) },
        },
      })
    } catch (error) {
      console.error('Error fetching collection:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  },
}

export default function CollectionPage(ctx: PageProps<Query, State>) {
  const { data, url, state } = ctx
  const t = state.geo.getT()

  // Use the collection data, or default values if collectionByHandle is undefined
  const collection = data.collectionByHandle || {
    title: 'All Products',
    descriptionHtml: '',
    seo: { title: 'All Products', description: 'Browse all products' },
    image: undefined,
    products: { edges: [] },
  }

  const products = collection.products.edges.map((edge) => edge.node)

  const meta = {
    ...pageMeta,
    locale: state.geo.locale,
    title: collection.seo.title,
    description: collection.seo.description,
    image: {
      url: collection.image?.jpg_small,
      width: collection.image?.width,
      height: collection.image?.height,
      alt: collection.image?.altText,
    },
  }
  const firstProductImage = products[0]?.featuredImage

  return (
    <>
      <Meta
        url={url}
        meta={{
          title: `${collection.title} - Shop`,
          description: `Browse our ${collection.title} collection`,
          locale: state.geo.locale,
          lang: state.geo.lang,
          image: firstProductImage
            ? {
              url: firstProductImage.jpg_small!,
              width: firstProductImage.width,
              height: firstProductImage.height,
              alt: firstProductImage.altText || '',
            }
            : undefined,
        }}
      />
      <div class='bg-primary h-[74px] md:h-[107px] w-full'></div>

      <main class='max-w-7xl mx-auto p-4 pt-[2vw]'>
        <h1 class='text-2xl font-bold mb-4'>{collection.title}</h1>
        {collection.descriptionHtml && (
          <div
            class='
          prose prose-lg text-gray-700 
          [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-4 
          [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-4
          [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-3
          [&>p]:mb-4 [&>p]:text-base
          [&>p>strong]:text-gray-800 [&>p>strong]:font-semibold
          [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
          [&>ul>li]:mb-2 
          [&>li>strong]:text-gray-800 [&>li>strong]:font-semibold
          [&>a]:text-blue-600 [&>a]:underline 
          [&>em]:text-gray-700 [&>em]:italic 
        '
            dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
          />
        )}
        {!!products.length && (
          <CollectionContent
            products={products}
            title={collection.descriptionHtml ? '' : collection.title}
            lang={state.geo.lang}
          />
        )}
      </main>
      <Footer meta={meta} t={t} />
    </>
  )
}
