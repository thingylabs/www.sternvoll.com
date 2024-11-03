import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { InlineMenu, Menu } from './HeaderMenu.tsx'
import { Cart } from '@/islands/Cart.tsx'

interface HeaderProps {
  forceBackground?: boolean
}

export function Header({ forceBackground = false }: HeaderProps) {
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
    <header
      class={`fixed top-0 left-0 w-full z-20 p-4 2xl:p-[1vw] transition-all duration-500 ${
        hasBackground.value
          ? 'bg-primary text-primary'
          : 'bg-transparent text-white'
      } transform ${
        isVisible.value
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
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
            class='object-scale-down h-10 2xl:h-[2vw]'
            src='/Sternvoll-bright.png'
            alt='Sternvoll'
          />
        </a>

        {/* Cart - Stays on the Right */}
        <div class='flex-none'>
          <Cart transparentButton={!hasBackground.value} />
        </div>
      </div>

      {/* Inline Navigation Links for large screens */}
      <InlineMenu />
    </header>
  )
}
