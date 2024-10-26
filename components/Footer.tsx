import { Social } from '@/components/Social.tsx'
import { MovingText } from '@/islands/MovingText.tsx'
import { meta } from '@/meta.ts'
import { Payment } from '@/components/Payment.tsx'

export const Footer = () => {
  return (
    <footer className=''>
      <div
        className={`
        container mx-auto px-6 py-8 pt-14
        md:pt-24
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
            `}
          >
            <a href='#' className='flex items-center'>
              <img
                src={meta.logos.square}
                className='mr-3 flex-shrink-0 h-8 drop-shadow'
                alt='Sternvoll Logo'
              />
              <h1
                className={`
                h-8
                text-3xl font-accent text-black font-bold
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
              lg:text-lg
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
                  <a href='#' className='hover:underline'>About</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Careers</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Brand Center</a>
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
                  <a href='#' className='hover:underline'>Discord Server</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Twitter</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Facebook</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Contact Us</a>
                </li>
              </ul>
            </div>
            <div className='w-1/2 mt-6'>
              <h3 className='font-semibold mb-4'>LEGAL</h3>
              <ul className='text-gray-500 space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>Privacy Policy</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Licensing</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Terms</a>
                </li>
              </ul>
            </div>
            <div className='w-1/2 mt-6'>
              <h3 className='font-semibold mb-4'>DOWNLOAD</h3>
              <ul className='text-gray-500 space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>iOS</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Android</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>Windows</a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>MacOS</a>
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
              xEnd: 260,
            },
            bottom: {
              xStart: 100,
              xEnd: -330,
            },
          }}
          fontSize='10vw'
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
