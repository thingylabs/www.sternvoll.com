import { InlineMenu, Menu } from './HeaderMenu.tsx'
import { Cart } from '@/islands/Cart.tsx'

export function Header() {
  return (
    <header class='fixed top-0 left-0 w-full z-20 p-4 bg-primary text-white'>
      <div class='flex justify-between items-center'>
        {/* Drawer Menu Button for small screens */}
        <div class='lg:hidden'>
          <Menu transparentButton />
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
          <Cart transparentButton />
        </div>
      </div>

      {/* Inline Navigation Links for large screens */}
      <InlineMenu />
    </header>
  )
}
