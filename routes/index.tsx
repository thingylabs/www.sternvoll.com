import { Handlers, PageProps } from '$fresh/server.ts'
import { graphql } from '@/utils/shopify.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { Header } from '../islands/Header.tsx'
import { List, Product } from '../utils/types.ts'
import { OurStory } from '../components/OurStory.tsx'
import { Hero } from '../components/Hero.tsx'
import { SelectedWorks } from '../components/SelectedWorks.tsx'
import { ImageCard } from '../components/ImageCard.tsx'
import { Hand } from '../islands/Hand.tsx'
import { CategoryCard } from '../components/CategoryCard.tsx'
import { FillLetter } from '../components/FillLetter.tsx'
import { Journal } from '../components/Journal.tsx'

const meta = {
  title: 'Sternvoll Jewelry: Effortless chic for every day',
  description:
    "Everyday doesn't mean boring! Discover luxurious 18K gold and lab-grown diamond jewelry that combines timeless elegance with modern style. Visit our new website for a unique shopping experience and exquisite designs.",
  image: 'og.png',
}

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

  return (
    <>
      <Meta url={url} meta={meta} />

      <Hero>
        <Header />
      </Hero>

      <div class='py-10'>
        <OurStory />
      </div>

      <div class='p-4 py-10 bg-white'>
        <SelectedWorks products={products} />
      </div>

      <div class='p-4 py-10 bg-white'>
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
      </div>

      <Hand />

      <div class='p-4 py-10 space-y-6'>
        <CategoryCard
          backgroundImage='category-earrings.jpg'
          text='Ohrringe'
          href='#'
        />
        <CategoryCard
          backgroundImage='category-rings.jpg'
          text='Ringe'
          href='#'
        />
        <CategoryCard
          backgroundImage='category-necklaces.jpg'
          text='Halsketten'
          href='#'
        />
        <CategoryCard
          backgroundImage='category-clip-ons.jpg'
          text='Clip-ons'
          href='#'
        />
      </div>

      <FillLetter
        letter='E'
        firstLine='Explore'
        secondLine='Collections'
        href='#'
      />

      <div class='text-center p-8 pt-12'>
        <h2 class='text-6xl font-accent'>Journal</h2>
        <p class='text-3xl font-accent italic pt-8'>
          Inspirierende Geschichten, Trends und Einblicke in die Schmuckwelt
        </p>
      </div>

      <Journal
        imageSrc='journal-cover.jpg'
        title='Sternvoll Journal Cover'
        date='2020 / April'
      />

      <Footer />
    </>
  )
}
