// components/product/ProductComponents.tsx
import type { Money } from '@/utils/types.ts'

// Helper function to format currency that handles Money type
export function formatCurrency(price: Money) {
  const amount = typeof price.amount === 'string'
    ? parseFloat(price.amount)
    : price.amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(amount)
}

interface ProductHeaderProps {
  title: string
  price: Money
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

interface BreadcrumbNavProps {
  category: ReturnType<
    typeof import('@/hooks/useProductCategories.ts').useProductCategories
  >
}

export function BreadcrumbNav({ category }: BreadcrumbNavProps) {
  return (
    <nav class='text-sm xl:text-base text-gray-900 flex items-center font-medium 2xl:text-[1vw]'>
      <a href='/' class='hover:text-gray-600 transition-colors'>Home</a>
      <span class='mx-2 text-gray-400'>/</span>
      <a href='/collections/all' class='hover:text-gray-600 transition-colors'>
        All Jewelry
      </a>
      {category && (
        <>
          <span class='mx-2 text-gray-400'>/</span>
          <a
            href={`/collections/${category.link}`}
            class='hover:text-gray-600 transition-colors'
          >
            {category.label}
          </a>
        </>
      )}
    </nav>
  )
}
