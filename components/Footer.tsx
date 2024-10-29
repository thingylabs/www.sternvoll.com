import { Social } from '@/components/Social.tsx'
import { MovingText } from '@/islands/MovingText.tsx'
import { meta } from '@/meta.ts'
import { Payment } from '@/components/Payment.tsx'

export const Footer = () => {
  return (
    <footer className='xl:text-[1.5vw]'>
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
                src={meta.logos.square}
                className={`
                mr-3 flex-shrink-0 h-8 drop-shadow
                xl:h-[2.5vw]
                `}
                alt='Sternvoll Logo'
              />
              <h1
                className={`
                text-3xl font-accent text-black font-bold
                xl:text-[2.5vw] xl:pt-[0.75vw]
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
            <div className='w-1/2'>
              <h3 className='font-semibold mb-4'>COMPANY</h3>
              <ul className='text-gray-500 space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>About Sternvoll</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Ambassadors</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Blog</a>
                </li>
              </ul>
            </div>
            <div className='w-1/2'>
              <h3 className='font-semibold mb-4'>HELP CENTER</h3>
              <ul className='text-gray-500 space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>
                    Contact information
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Shipping policy</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Refund policy</a>
                </li>
              </ul>
            </div>
            <div className='w-1/2 mt-6'>
              <h3 className='font-semibold mb-4'>LEGAL</h3>
              <ul className='text-gray-500 space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>Privacy policy</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Terms of service</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Legal notice</a>
                </li>
              </ul>
            </div>
            <div className='w-1/2 mt-6'>
              <h3 className='font-semibold mb-4'>FROM OUR BLOG</h3>
              <ul className='text-gray-500 space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>
                    Something interesting
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Another something</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    <i>More...</i>
                  </a>
                </li>
              </ul>
            </div>
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
