import { Handlers, PageProps } from '$fresh/server.ts'
import { graphql } from '@/utils/shopify.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { Header } from '../islands/Header.tsx'
import { List, Product } from '../utils/types.ts'
import { OurStory } from '../islands/OurStory.tsx'
import { Hero } from '../components/Hero.tsx'
import { SelectedWorks } from '../components/SelectedWorks.tsx'
import { ImageCard } from '../components/ImageCard.tsx'
import { Hand } from '../islands/Hand.tsx'

const q = `{
  collection(id: "gid://shopify/Collection/534705242378") {
    products(first: 8) {
      nodes {
        id
        handle
        title
        tags
        featuredImage {
          url(transform: {preferredContentType: WEBP, maxWidth:400, maxHeight:400})
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`

interface Collection {
  collection: {
    products: List<Product>
  }
}

export const handler: Handlers<Collection> = {
  async GET(_req, ctx) {
    const data = await graphql<Collection>(q)
    return ctx.render(data)
  },
}

export default function Home(ctx: PageProps<Collection>) {
  const { data, url } = ctx
  const products = data.collection.products.nodes

  const meta = {
    description: 'Shop for Deno Merch',
    image: 'og-image.png',
    title: 'Deno Merch',
  }

  return (
    <>
      <Meta url={url} meta={meta} />

      <Hero>
        <Header />
      </Hero>

      <OurStory />

      <SelectedWorks products={products} />

      <ImageCard
        image='collection-clip-ons.jpg'
        title='Sanfte Berührung - Schmerzfreie Ohrclips'
        text='Komfort und Eleganz, mühelos vereint.'
        linkTitle='CLIPS ENTDECKEN'
        link='#'
        orientation='left'
      />
      <ImageCard
        image='collection-perfect-match.jpg'
        title='Perfektes Match für jeden Anlass'
        text='Die sorgfältig zusammengestellten Schmuck-Sets verpassen jeder Garderobe den letzten Schliff.'
        linkTitle='SETS ENTDECKEN'
        link='#'
        orientation='right'
      />
      <ImageCard
        image='collection-diamond-finishing.jpg'
        title='Funkeln wie ein Diamant'
        text='Die charakteristische Oberflächenveredelung verleiht einen unverwechselbaren Glanz.'
        linkTitle='DIAMOND FINISH ENTDECKEN'
        link='#'
        orientation='left'
      />
      <ImageCard
        image='collection-heart-shaped.jpg'
        title='Unvergessliche Herzens-angelegenheiten'
        text='Eine Kollektion, die Liebe in zeitloser Eleganz und glänzendem Design einfängt.'
        linkTitle='HERZEN ENTDECKEN'
        link='#'
        orientation='right'
      />

      <Hand />

      <Footer />
    </>
  )
}
