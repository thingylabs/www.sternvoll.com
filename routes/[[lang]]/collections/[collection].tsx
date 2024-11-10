import { Handlers, PageProps } from '$fresh/server.ts'
import { Header } from '@/islands/Header.tsx'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { CollectionContent } from '@/islands/CollectionContent.tsx'
import { graphql } from '@/utils/shopify.ts'
import { Image, Product } from '@/utils/types.ts'
import type { Data } from '@/routes/_middleware.ts'
import { meta as pageMeta } from '@/config/meta.ts'

interface Query {
  collectionByHandle: {
    title: string
    descriptionHtml: string
    image: Image
    seo: {
      title: string
      description: string
    }
    products: {
      edges: { node: Product & { normalizedSales: number } }[]
    }
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
            url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
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

export const handler: Handlers<Query, Data> = {
  async GET(_req, ctx) {
    const { collection } = ctx.params

    try {
      const data = await graphql<Query>(
        q,
        { collection },
        ctx.state.geo.lang,
      )

      if (!data.collectionByHandle) {
        return new Response('Collection not found', { status: 404 })
      }

      // Use product order to assign a normalized sales value
      const products = data.collectionByHandle.products.edges.map((edge) =>
        edge.node
      )
      const totalProducts = products.length

      const normalizedProducts = products.map((product, index) => {
        // Normalize sales based on position: first product gets 1, last gets 0
        const normalizedSales = (totalProducts - index - 1) /
          (totalProducts - 1)
        return {
          ...product,
          normalizedSales: totalProducts === 1 ? 1 : normalizedSales,
        }
      })

      return ctx.render({
        collectionByHandle: {
          ...data.collectionByHandle,
          products: { edges: normalizedProducts.map((node) => ({ node })) },
        },
      })
    } catch (error) {
      console.error('Error fetching collection:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  },
}

export default function CollectionPage(ctx: PageProps<Query, Data>) {
  const { data, url, state } = ctx
  const t = state.geo.getT()
  const { collectionByHandle: collection } = data
  const products = collection.products.edges.map((edge) => edge.node)

  const meta = {
    ...pageMeta,
    locale: state.geo.locale,
    title: collection.seo.title,
    description: collection.seo.description,
    image: {
      url: collection.image?.url,
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
          locale: 'en-US',
          image: firstProductImage
            ? {
              url: firstProductImage.url,
              width: firstProductImage.width,
              height: firstProductImage.height,
              alt: firstProductImage.altText || '',
            }
            : undefined,
        }}
      />
      <Header forceBackground t={t} />
      <main class='max-w-7xl mx-auto p-4 pt-[2vw]'>
        <h1 class='text-2xl font-bold mb-4'>{collection.title}</h1>
        {collection.descriptionHtml && (
          <div
            class='collection-description mb-8'
            dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
          />
        )}
        <CollectionContent products={products} title={collection.title} />
      </main>
      <Footer meta={meta} t={t} />
    </>
  )
}
