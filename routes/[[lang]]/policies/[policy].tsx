import { Handlers, PageProps } from '$fresh/server.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import { Header } from '@/islands/Header.tsx'
import { graphql } from '@/utils/shopify.ts'
import type { Data } from '@/routes/_middleware.ts'
import { meta as siteMeta } from '@/config/meta.ts'

interface PolicyData {
  title: string
  body: string
}

interface Query {
  shop: {
    privacyPolicy?: PolicyData
    termsOfService?: PolicyData
    refundPolicy?: PolicyData
    shippingPolicy?: PolicyData
    subscriptionPolicy?: PolicyData
  }
}

const q = `query {
  shop {
    privacyPolicy {
      title
      body
    }
    termsOfService {
      title
      body
    }
    refundPolicy {
      title
      body
    }
    shippingPolicy {
      title
      body
    }
    subscriptionPolicy {
      title
      body
    }
  }
}`

function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

export const handler: Handlers<{ policy: PolicyData }, Data> = {
  async GET(_req, ctx) {
    const { policy: policyHandle } = ctx.params

    try {
      const data = await graphql<Query>(q, {}, ctx.state.geo.lang)

      // Convert kebab-case policy handle to camelCase
      const camelCasePolicyHandle = kebabToCamelCase(policyHandle)

      // Map policy handles to the data fields
      const policyMapping: Record<string, PolicyData | undefined> = {
        privacyPolicy: data.shop.privacyPolicy,
        termsOfService: data.shop.termsOfService,
        refundPolicy: data.shop.refundPolicy,
        shippingPolicy: data.shop.shippingPolicy,
        subscriptionPolicy: data.shop.subscriptionPolicy,
      }

      const selectedPolicy = policyMapping[camelCasePolicyHandle]
      if (!selectedPolicy) {
        return new Response('Policy not found', { status: 404 })
      }

      return ctx.render({ policy: selectedPolicy })
    } catch (error) {
      console.error('Error fetching policy data:', error)
      return new Response('Error fetching policy data', { status: 500 })
    }
  },
}

export default function PolicyPage(
  { data, url, state }: PageProps<{ policy: PolicyData }, Data>,
) {
  const { policy } = data
  const getT = state.geo.getT
  const t = getT()

  if (!policy) {
    return <div>{t['Policy not found']}</div>
  }

  const meta = {
    ...siteMeta,
    title: policy.title,
    description: policy.title,
    locale: state.geo.locale,
  }

  return (
    <>
      <Meta url={url} meta={meta} />
      <Header forceBackground t={getT(['Shopping Cart', 'Open cart'])} />

      <main class='max-w-4xl mx-auto p-4'>
        <h1 class='text-2xl font-bold mb-4'>{policy.title}</h1>
        <div
          class='
  prose prose-lg text-gray-700 
  [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-4
  [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-3
  [&>p]:mb-4 [&>p]:text-base
  [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
  [&>ul>li]:mb-2 
  [&>li>strong]:text-gray-800 [&>li>strong]:font-semibold
  [&>a]:text-blue-600 [&>a]:underline
          '
          dangerouslySetInnerHTML={{ __html: policy.body }}
        />
      </main>

      <div class='back-to-shop mt-12 px-4'>
        <a
          href='/'
          class='flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-200'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
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

      <Footer meta={meta} t={t} />
    </>
  )
}
