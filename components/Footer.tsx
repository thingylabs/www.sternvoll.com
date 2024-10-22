export const Footer = () => {
  return (
    <footer className='bg-white py-8'>
      <div className='container mx-auto px-4'>
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
            {/* Social media icons */}
            <div className='flex mt-4 space-x-4'>
              {/* Facebook */}
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M22.675 0h-21.35c-.729 0-1.325.596-1.325 1.325v21.351c0 .73.596 1.325 1.325 1.325h11.495v-9.294h-3.13v-3.622h3.13v-2.671c0-3.1 1.892-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.916c-1.502 0-1.793.713-1.793 1.76v2.316h3.587l-.467 3.622h-3.12v9.294h6.116c.729 0 1.325-.596 1.325-1.325v-21.351c0-.729-.596-1.325-1.325-1.325z'
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 2.163c3.5 0 3.9.014 5.285.08 1.48.067 2.85.354 3.91 1.414 1.06 1.06 1.347 2.43 1.414 3.91.066 1.385.08 1.785.08 5.285s-.014 3.9-.08 5.285c-.067 1.48-.354 2.85-1.414 3.91-1.06 1.06-2.43 1.347-3.91 1.414-1.385.066-1.785.08-5.285.08s-3.9-.014-5.285-.08c-1.48-.067-2.85-.354-3.91-1.414-1.06-1.06-1.347-2.43-1.414-3.91-.066-1.385-.08-1.785-.08-5.285s.014-3.9.08-5.285c.067-1.48.354-2.85 1.414-3.91 1.06-1.06 2.43-1.347 3.91-1.414C8.1 2.177 8.5 2.163 12 2.163m0-2.163c-3.259 0-3.667.015-4.947.072-1.656.072-3.125.401-4.289 1.566-1.164 1.165-1.494 2.634-1.566 4.289-.057 1.281-.072 1.688-.072 4.947s.015 3.667.072 4.947c.072 1.656.401 3.125 1.566 4.289 1.165 1.165 2.634 1.494 4.289 1.566 1.281.057 1.688.072 4.947.072s3.667-.015 4.947-.072c1.656-.072 3.125-.401 4.289-1.566 1.165-1.165 1.494-2.634 1.566-4.289.057-1.281.072-1.688.072-4.947s-.015-3.667-.072-4.947c-.072-1.656-.401-3.125-1.566-4.289-1.165-1.165-2.634-1.494-4.289-1.566-1.281-.057-1.688-.072-4.947-.072z'
                  />
                  <circle cx='12' cy='12' r='4.2' fill='currentColor' />
                  <circle cx='18.5' cy='5.5' r='1.8' fill='currentColor' />
                </svg>
              </a>

              {/* TikTok */}
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12.96 2c.33 1.13 1.15 2.06 2.24 2.53.44.19.92.31 1.41.32v2.66c-.49-.01-.97-.1-1.41-.27a5.505 5.505 0 0 1-1.83-1.09v6.2a4.8 4.8 0 0 1-4.8 4.8 4.81 4.81 0 0 1-2.51-.69 4.807 4.807 0 0 1-2.29-4.11 4.8 4.8 0 0 1 4.8-4.8c.06 0 .12.004.18.008v2.71a2.14 2.14 0 0 0-.18-.01 2.07 2.07 0 0 0-2.07 2.07c0 1.14.93 2.07 2.07 2.07s2.07-.93 2.07-2.07V2h2.4z'
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M23.499 6.203a2.991 2.991 0 0 0-2.104-2.107C19.697 3.5 12 3.5 12 3.5s-7.697 0-9.395.596A2.991 2.991 0 0 0 .501 6.203C0 7.902 0 12 0 12s0 4.098.501 5.797a2.991 2.991 0 0 0 2.104 2.107C4.303 20.5 12 20.5 12 20.5s7.697 0 9.395-.596a2.991 2.991 0 0 0 2.104-2.107C24 16.098 24 12 24 12s0-4.098-.501-5.797zM9.75 15.5v-7l6.5 3.5-6.5 3.5z'
                  />
                </svg>
              </a>

              {/* Twitter */}
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M23.444 4.834c-.814.36-1.686.602-2.606.711a4.55 4.55 0 0 0 1.992-2.507 9.04 9.04 0 0 1-2.884 1.102A4.515 4.515 0 0 0 16.335 3c-2.495 0-4.515 2.02-4.515 4.515 0 .354.04.698.117 1.03-3.754-.188-7.084-1.985-9.308-4.716a4.497 4.497 0 0 0-.611 2.27c0 1.567.798 2.951 2.013 3.762a4.485 4.485 0 0 1-2.047-.566v.057c0 2.189 1.557 4.014 3.625 4.43a4.528 4.528 0 0 1-2.041.077 4.518 4.518 0 0 0 4.217 3.132A9.053 9.053 0 0 1 1.607 19a12.764 12.764 0 0 0 6.917 2.027c8.301 0 12.842-6.876 12.842-12.842 0-.195-.004-.39-.013-.583a9.175 9.175 0 0 0 2.25-2.35z'
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M22.23 0H1.77C.792 0 0 .774 0 1.728v20.543C0 23.226.792 24 1.77 24h20.46c.978 0 1.77-.774 1.77-1.728V1.728C24 .774 23.208 0 22.23 0zM7.125 20.452H3.563V9.046h3.562v11.406zM5.344 7.521a2.065 2.065 0 1 1 0-4.129 2.065 2.065 0 0 1 0 4.129zm15.109 12.93h-3.562v-5.733c0-1.366-.026-3.122-1.902-3.122-1.902 0-2.194 1.486-2.194 3.017v5.838h-3.563V9.046h3.419v1.559h.049c.476-.901 1.635-1.848 3.366-1.848 3.6 0 4.267 2.368 4.267 5.448v6.247z'
                  />
                </svg>
              </a>

              {/* Google Maps */}
              <a href='#' className='text-gray-500 hover:text-gray-900'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 2C8.588 2 6 4.588 6 8c0 3.876 4.375 8.7 5.544 9.961a.747.747 0 0 0 1.115 0C13.625 16.7 18 11.876 18 8c0-3.412-2.588-6-6-6zm0 13c-1.535-1.816-4.5-5.625-4.5-7 0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5c0 1.375-2.965 5.184-4.5 7z'
                  />
                  <circle cx='12' cy='8' r='2.5' />
                </svg>
              </a>
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

        {/* Footer bottom */}
        <div className='mt-8 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm'>
          <p>© 2024 Sternvoll Jewelry. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
