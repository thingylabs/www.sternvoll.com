import { useEffect, useRef, useState } from 'preact/hooks'
import { menuItems } from '@/config/headerMenu.ts'

export function InlineMenu() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleToggle = (categoryLabel: string) => {
    setOpenCategory((prev) => (prev === categoryLabel ? null : categoryLabel))
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenCategory(null)
    }
  }

  useEffect(() => {
    if (openCategory) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openCategory])

  return (
    <div
      class={`
    hidden lg:flex justify-center space-x-6 mt-2 mb-1
    md:mt-[1.75vw]
    2xl:mt-[0.75vw] 2xl:text-[1vw] 2xl:space-x-[2vw]
    `}
    >
      {menuItems.map((category) =>
        category.items
          ? (
            <div
              key={category.label}
              class='relative'
              ref={openCategory === category.label ? dropdownRef : null}
            >
              <button
                onClick={() => handleToggle(category.label)}
                class='text-white hover:text-gray-300 flex items-center opacity-75'
              >
                {category.label}
                <span class='ml-1 pl-2'>▾</span> {/* Triangle indicator */}
              </button>

              {/* Dropdown menu */}
              {openCategory === category.label && (
                <div class='absolute left-0 mt-2 bg-gray-100 text-gray-900 shadow-lg rounded-lg p-4 2xl:scale-2 w-[600px] 2xl:w-[45vw]'>
                  <div class='grid grid-cols-4 gap-8'>
                    {category.items.map((subCategory) => (
                      <div key={subCategory.label}>
                        <h4 class='font-semibold mb-2'>{subCategory.label}</h4>
                        <ul class='space-y-1'>
                          {subCategory.items?.map((subItem) => (
                            <li key={subItem.label}>
                              <a
                                href={subItem.link}
                                class='block py-1 hover:bg-gray-200 rounded'
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
          : (
            <a
              key={category.label}
              href={category.link}
              class='text-white hover:text-gray-300  opacity-75'
            >
              {category.label}
            </a>
          )
      )}
    </div>
  )
}
