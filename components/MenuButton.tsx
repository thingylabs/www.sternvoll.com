interface MenuButtonProps {
  transparentButton?: boolean
}

export function MenuButton({ transparentButton = false }: MenuButtonProps) {
  return (
    <button
      type='button'
      class={`relative rounded-md p-2 opacity-50 hover:opacity-100 ${
        transparentButton
          ? 'bg-transparent border border-secondary opacity-6'
          : 'bg-secondary'
      }`}
    >
      <span class='sr-only'>Open menu</span>
      <svg
        class='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='currentColor'
        data-slot='icon'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
        />
      </svg>
    </button>
  )
}
