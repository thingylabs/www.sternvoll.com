import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { Cart } from './Cart.tsx'
import { MenuButton } from '../components/MenuButton.tsx'

export function Header() {
  const hasBackground = useSignal(false)
  const isVisible = useSignal(true)
  const lastScrollTop = useSignal(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = globalThis.scrollY

      // Set background if scrolled past 95% of viewport height
      hasBackground.value = currentScrollTop > globalThis.innerHeight * 0.95

      // Show header when scrolling up, hide when scrolling down
      isVisible.value = currentScrollTop < lastScrollTop.value ||
        currentScrollTop < 100

      lastScrollTop.value = currentScrollTop
    }

    globalThis.addEventListener('scroll', handleScroll)
    return () => {
      globalThis.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      class={`fixed top-0 left-0 w-full z-20 p-4 transition-all duration-500 ${
        hasBackground.value
          ? 'bg-primary text-primary'
          : 'bg-transparent text-white'
      } ${isVisible.value ? 'translate-y-0' : '-translate-y-full'}`}
      style={{
        transition:
          'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
      }}
    >
      <div class='flex justify-between items-center'>
        {/* Menu Button */}
        <div class='flex-none'>
          <MenuButton transparentButton={!hasBackground.value} />
        </div>

        {/* Logo */}
        <div class='flex-1 px-4 flex justify-center'>
          <img
            class='object-scale-down h-10'
            src='/Sternvoll-bright.png'
            alt='Sternvoll'
          />
        </div>

        {/* Cart */}
        <div class='flex-none'>
          <Cart transparentButton={!hasBackground.value} />
        </div>
      </div>
    </header>
  )
}
