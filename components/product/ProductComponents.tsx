// components/product/ProductComponents.tsx
import type { Product } from '@/utils/types.ts'
import { formatCurrency } from '@/utils/data.ts'

interface BreadcrumbNavProps {
  category: ReturnType<
    typeof import('@/hooks/useProductCategories.ts').useProductCategories
  >
}

export function BreadcrumbNav({ category }: BreadcrumbNavProps) {
  return (
    <nav class='my-4 text-sm xl:text-base text-gray-500 flex justify-center md:justify-start 2xl:text-[1vw]'>
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
  )
}

interface ProductHeaderProps {
  title: string
  price: Product['variants']['nodes'][0]['priceV2']
}

export function ProductHeader({ title, price }: ProductHeaderProps) {
  return (
    <div class='flex flex-col items-center md:items-start gap-2 text-center md:text-left'>
      <h1 class='text-2xl lg:text-3xl xl:text-[1.75vw] font-semibold text-gray-800 2xl:mt-[2vw]'>
        {title}
      </h1>
      <div class='text-xl xl:text-[1vw] font-thin tracking-wide 2xl:mt-[2vw]'>
        {formatCurrency(price)}
      </div>
    </div>
  )
}

interface AdditionalInformationProps {
  product: Product
}

export function AdditionalInformation({ product }: AdditionalInformationProps) {
  function parseDescription(descriptionHtml: string) {
    if (!descriptionHtml) return []
    const paragraphs = descriptionHtml
      .split('</p>')
      .map((p) => p.replace(/<[^>]+>/g, '').trim())
      .filter((p) => p)
    return paragraphs.slice(1).map((para) => {
      const [title, ...rest] = para.split(':')
      return { title: title?.trim(), content: rest.join(':').trim() }
    })
  }

  const accordions = parseDescription(product.descriptionHtml)

  if (accordions.length === 0) return null

  return (
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
  )
}
