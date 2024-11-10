import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { Menu } from './HeaderSidebarMenu.tsx'
import { InlineMenu } from '@/components/HeaderInlineMenu.tsx'
import { Cart, T } from '@/islands/Cart.tsx'

interface HeaderProps {
  forceBackground?: boolean
  t: T
}

export function Header({ forceBackground = false, t }: HeaderProps) {
  const hasBackground = useSignal(forceBackground)
  const isVisible = useSignal(false) // Start with the header hidden
  const lastScrollTop = useSignal(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = globalThis.scrollY

      // Set background if scrolled past 95% of viewport height or if forceBackground is true
      hasBackground.value = forceBackground ||
        scrollTop > globalThis.innerHeight * 0.95

      // Show header when scrolling up, hide when scrolling down
      isVisible.value = scrollTop < lastScrollTop.value || scrollTop < 100

      lastScrollTop.value = scrollTop
    }

    globalThis.addEventListener('scroll', handleScroll)
    return () => {
      globalThis.removeEventListener('scroll', handleScroll)
    }
  }, [forceBackground])

  useEffect(() => {
    // Make the header visible on mount
    isVisible.value = true
  }, [])

  return (
    <div class='h-[12vw]'>
      <header
        class={`fixed top-0 left-0 w-full z-20 p-4 2xl:p-[1vw] transition-all duration-500 ${
          hasBackground.value
            ? 'bg-primary text-primary'
            : 'bg-transparent text-white'
        } transform ${
          isVisible.value
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        } lg:text-white`}
      >
        <div class='relative flex items-center justify-between'>
          {/* Drawer Menu Button or Placeholder */}
          <div class='flex-none'>
            <div class='lg:hidden'>
              <Menu transparentButton={!hasBackground.value} />
            </div>
            <div class='hidden lg:block w-10'></div>{' '}
            {/* Placeholder for spacing */}
          </div>

          {/* Centered Logo */}
          <a
            href='/'
            class='absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none'
          >
            <img
              class={`
              object-scale-down h-10
              lg:h-[2.75vw] 2xl:h-[2.5vw] 2xl:my-[1vw]
              `}
              src='/Sternvoll-bright.png'
              alt='Sternvoll'
            />
          </a>

          {/* Cart - Stays on the Right */}
          <div class='flex items-center space-x-4 flex-none'>
            {/* User Icon */}
            <div class='hidden lg:inline'>
              <svg
                width='30'
                height='30'
                class='2xl:w-[3vw] 2xl:h-[3vw]'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='12' cy='8' r='4' stroke='white' stroke-width='1' />
                <path
                  d='M4 20c0-4 4-6 8-6s8 2 8 6'
                  stroke='white'
                  stroke-width='1'
                  stroke-linecap='round'
                />
              </svg>
            </div>

            {/* Cart Component */}
            <Cart transparentButton={!hasBackground.value} t={t} />
          </div>
        </div>

        {/* Inline Navigation Links for large screens */}
        <InlineMenu />
      </header>
    </div>
  )
}
