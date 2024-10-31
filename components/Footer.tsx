import { Social } from '@/components/Social.tsx'
import { MovingText } from '@/islands/MovingText.tsx'
import { meta } from '../config/meta.ts'
import { Payment } from '@/components/Payment.tsx'
import { menuItems } from '@/config/footerMenu.ts'

export const Footer = () => {
  return (
    <footer className='xl:text-[1.3vw]'>
      <div
        className={`
        container mx-auto px-6 py-8 pt-14
        md:pt-24
        xl:max-w-[80vw]
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
            md:w-1/2 md:pt-6 md:mb-0 md:px-12
            xl:pr-[5vw]
            `}
          >
            <a href='#' className='flex items-center'>
              <img
                src={'/' + meta.logos.square}
                className={`
                mr-3 flex-shrink-0 h-8 drop-shadow
                xl:h-[2.5vw]
                `}
                alt='Sternvoll Logo'
              />
              <h1
                className={`
                pt-2
                text-3xl font-accent text-black font-bold
                xl:text-[2.5vw]
                drop-shadow
                `}
              >
                {meta.title}
              </h1>
            </a>
            <p
              className={`
              text-justify font-accent tracking-wider text-black
              mt-4
              drop-shadow
              lg:text-lg xl:text-[1.5vw] xl:leading-snug
              `}
            >
              {meta.shortDescription}
            </p>
            <div class='pt-5'>
              <Payment />
            </div>
          </div>

          {/* Menu Links */}
          <div className='pl-2 pt-6 w-full md:w-1/2 flex flex-wrap justify-between'>
            {menuItems.map((section) => (
              <div key={section.title} className='w-1/2 pb-6'>
                <h3 className='font-semibold mb-4'>{section.title}</h3>
                <ul className='text-gray-500 space-y-2'>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className='hover:underline'>
                        {link.label}
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
          firstLine='There is nothing wrong'
          secondLine='with looking good'
          inset={{
            top: {
              xStart: -50,
              xEnd: 90,
            },
            bottom: {
              xStart: 100,
              xEnd: -110,
            },
          }}
          fontSize='9vw'
          color='#eee8e3'
        >
          <Social />
        </MovingText>
      </div>

      <div
        className={`
        text-center text-gray-500 text-sm
        pt-[20vw]
        pb-8
        `}
      >
        <p>© 2024. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
