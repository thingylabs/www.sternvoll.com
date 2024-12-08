// components/Footer.tsx
import { Social } from '@/components/Social.tsx'
import { MovingText } from '@/islands/MovingText.tsx'
import { Payment } from '@/components/Payment.tsx'
import { menuItems } from '@/config/footerMenu.ts'
import { TranslationKey, TranslationMap } from '@/translations.ts'
import { PartialMeta } from '@/config/meta.ts'
import { ResponsiveImage } from '@/components/ResponsiveImage.tsx'

interface FooterProps {
  meta: PartialMeta
  t: TranslationMap
}

export const Footer = ({ meta, t }: FooterProps) => {
  return (
    <footer className='xl:text-[1.3vw]'>
      <div
        className={`
        container mx-auto px-6 py-8 pt-14
        md:pt-24
        xl:max-w-[80vw]
        xl:px-0
        `}
      >
        <div
          className={`
          flex flex-col justify-between items-start
          md:flex-row
          `}
        >
          {/* Logo and description */}
          <div
            className={`
            w-full mb-6
            md:w-1/2 md:pt-6 md:mb-0 md:px-0 md:pr-12
            xl:pr-[5vw]
            `}
          >
            <a href='/' className='flex items-center'>
              <ResponsiveImage
                src='/sternvoll-logo.png'
                class='
                  mr-3 flex-shrink-0 h-8 drop-shadow
                  xl:h-[2vw]
                '
                alt='Sternvoll Jewelry Logo'
                width={[36, 54, 72]}
                height={36}
              />
              <h1
                className={`
                pt-2
                text-3xl font-accent text-black
                xl:text-[2vw]
                `}
              >
                Sternvoll Jewelry
              </h1>
            </a>
            <p
              className={`
              text-justify font-accent tracking-wider text-black
              mt-4
              lg:text-lg xl:text-[1vw] xl:leading-snug
              `}
            >
              {t[meta.shortDescription as TranslationKey]}
            </p>
            <div class='pt-5'>
              <Payment />
            </div>
          </div>

          {/* Menu Links */}
          <div className='pt-6 w-full md:w-1/2 flex flex-wrap justify-between'>
            {menuItems.map((section) => (
              <div key={section.title} className='w-1/2 pb-6'>
                <h3 className='font-semibold mb-4 xl:text-[1vw]'>
                  {t[section.title]}
                </h3>
                <ul className='text-gray-500 space-y-2 xl:text-[1vw]'>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className='hover:underline'>
                        {t[link.label]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        class={`
        relative h-[20vw]
        mt-4
        `}
      >
        <MovingText
          firstLine={t['There is nothing wrong']}
          secondLine={t['with looking good']}
          inset={{
            top: {
              xStart: -10,
              xEnd: 20,
            },
            bottom: {
              xStart: 70,
              xEnd: 10,
            },
          }}
          fontSize='9vw'
          color='#eee8e3'
        >
          <div class='h-[20vw] flex items-center justify-center'>
            <Social />
          </div>
        </MovingText>
      </div>

      <div
        className={`
        text-center text-gray-500 text-sm
        pt-[20vw]
        pb-8
        `}
      >
        <p>{t['© 2024. All Rights Reserved.']}</p>
      </div>
    </footer>
  )
}
