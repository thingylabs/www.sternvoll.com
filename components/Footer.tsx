import { Social } from '@/components/Social.tsx'
import { MovingText } from '@/islands/MovingText.tsx'

export const Footer = () => {
  return (
    <footer className=''>
      <div className='container mx-auto px-10 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          {/* Left section: Logo and description */}
          <div className='w-full md:w-1/2 mb-6 md:mb-0'>
            <a href='#' className='flex items-center'>
              <img
                src='Sternvoll-star.png'
                className='h-8 mr-3'
                alt='Sternvoll Star'
              />
              <span className='text-2xl font-semibold'>Sternvoll Jewelry</span>
            </a>
            <p className='mt-4 text-gray-500'>
              Sternvoll Jewelry is a modern, ethically sourced jewelry brand,
              offering beautiful, sustainable pieces for everyone.
            </p>
            <div class='pt-4 pb-2'>
              <Social />
            </div>
          </div>

          {/* Right section: Links */}
          <div className='w-full md:w-1/2 flex flex-wrap justify-between'>
            <div className='w-1/2'>
              <h3 className='text-gray-900 font-semibold mb-4'>COMPANY</h3>
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
              <h3 className='text-gray-900 font-semibold mb-4'>HELP CENTER</h3>
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
              <h3 className='text-gray-900 font-semibold mb-4'>LEGAL</h3>
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
              <h3 className='text-gray-900 font-semibold mb-4'>DOWNLOAD</h3>
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

      <MovingText
        firstLine='There is nothing wrong'
        secondLine='with looking good'
        insetConfig={{
          top: {
            xStart: -50,
            xEnd: 150,
          },
          bottom: {
            xStart: 100,
            xEnd: -180,
          },
        }}
        height='35vw'
        fontSize='9vw'
        color='#eee8e3'
      />

      {/* Footer bottom */}
      <div className='text-center mt-8 pt-6 text-gray-500 text-sm py-8'>
        <p>© 2024 Sternvoll Jewelry. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
