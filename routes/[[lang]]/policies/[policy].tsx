import { Handlers, PageProps } from '$fresh/server.ts'
import { Footer } from '@/components/Footer.tsx'
import { Meta } from '@/components/Meta.tsx'
import {
  Header,
  translationKeys as headerTranslationKeys,
} from '@/islands/Header.tsx'
import { adminApiGraphql } from '@/utils/shopify.ts'
import type { Data } from '@/routes/_middleware.ts'
import { meta as siteMeta } from '@/config/meta.ts'
import {
  comfortCheckout,
  defaultPolicy,
} from '../../../config/privacyPolicies.ts'

interface PolicyData {
  title: string
  body: string
}

interface Query {
  shop: {
    shopPolicies: {
      title: string
      body: string
      type: string
    }[]
  }
}

const policyQuery = `query {
  shop {
    shopPolicies {
      title
      body
      type
    }
  }
}`

function kebabToUpperSnakeCase(str: string): string {
  return str.replace(/-/g, '_').toUpperCase()
}

export const handler: Handlers<{ policy: PolicyData | null }, Data> = {
  async GET(_req, ctx) {
    const { policy: policyHandle } = ctx.params
    const policyType = kebabToUpperSnakeCase(policyHandle)
    const t = ctx.state.geo.getT()

    // Special case for "privacy-policy" page
    if (policyHandle === 'privacy-policy') {
      return ctx.render({
        policy: {
          title: t['Default Privacy Policy'],
          body: defaultPolicy[ctx.state.geo.lang],
        },
      })
    }

    if (policyHandle === 'privacy-policy-comfort-checkout') {
      return ctx.render({
        policy: {
          title: t['Privacy Policy Comfort Checkout'],
          body: comfortCheckout[ctx.state.geo.lang],
        },
      })
    }

    try {
      // Use the Admin API to fetch all available policies
      const data = await adminApiGraphql<Query>(policyQuery)
      const selectedPolicy = data.shop.shopPolicies.find(
        (policy) => policy.type === policyType,
      )

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
  { data, url, state }: PageProps<{ policy: PolicyData | null }, Data>,
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
      <Header
        forceBackground
        t={getT(headerTranslationKeys)}
        lang={state.geo.lang}
        country={state.geo.country}
        isEuIp={state.geo.isEuIp}
      />

      <div class='px-4 md:px-8 lg:px-12 xl:px-0 xl:max-w-[80vw] mx-auto 2xl:pt-[5vw]'>
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

        <div class='back-to-shop mt-12 xl:text-base 2xl:text-[1vw]'>
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
      </div>

      <Footer meta={meta} t={t} />
    </>
  )
}
