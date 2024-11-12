import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { SelectedWorks } from '@/components/SelectedWorks.tsx'
import { Product } from '@/utils/types.ts'

interface CollectionContentProps {
  products: Product[]
  title: string
  lang: string
}

export function CollectionContent({
  products,
  title,
  lang,
}: CollectionContentProps) {
  const [sortOption, setSortOption] = useState('best-selling')
  const [filterAvailability, setFilterAvailability] = useState<string[]>([])
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const filterMenuRef = useRef<HTMLDivElement>(null)

  // Handle sorting change
  const handleSortChange = (e: Event) => {
    const target = e.target as HTMLSelectElement
    setSortOption(target.value)
  }

  // Toggle availability filter
  const toggleAvailabilityFilter = (option: string) => {
    setFilterAvailability((prevFilters) =>
      prevFilters.includes(option)
        ? prevFilters.filter((item) => item !== option)
        : [...prevFilters, option]
    )
  }

  // Toggle filter menu open/close state
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev)
  }

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setIsFilterMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Filter and sort products based on selected options
  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = [...products] // Create a copy to avoid mutation

    // Apply availability filter
    if (filterAvailability.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const isInStock = product.variants.nodes[0]?.availableForSale
        return (
          (filterAvailability.includes('in-stock') && isInStock) ||
          (filterAvailability.includes('out-of-stock') && !isInStock)
        )
      })
    }

    // Apply sorting
    switch (sortOption) {
      case 'title-ascending':
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-descending':
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'price-ascending':
        filteredProducts.sort((a, b) => {
          const priceA = parseFloat(
            String(a.priceRange.minVariantPrice.amount || '0'),
          )
          const priceB = parseFloat(
            String(b.priceRange.minVariantPrice.amount || '0'),
          )
          return priceA - priceB
        })
        break
      case 'price-descending':
        filteredProducts.sort((a, b) => {
          const priceA = parseFloat(
            String(a.priceRange.minVariantPrice.amount || '0'),
          )
          const priceB = parseFloat(
            String(b.priceRange.minVariantPrice.amount || '0'),
          )
          return priceB - priceA
        })
        break
      case 'created-ascending':
        filteredProducts.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        break
      case 'created-descending':
        filteredProducts.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      default: // 'best-selling'
        break
    }

    return filteredProducts
  }, [products, filterAvailability, sortOption])

  return (
    <>
      {/* Controls */}
      <div class='flex items-center justify-between mb-6'>
        {/* Filter Menu */}
        <div class='relative' ref={filterMenuRef}>
          <button
            class='text-sm font-medium underline'
            onClick={toggleFilterMenu}
          >
            Filter: Availability
          </button>
          {isFilterMenuOpen && (
            <div class='absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-64 z-10'>
              <p class='text-sm mb-2'>{filterAvailability.length} selected</p>
              <button
                class='text-sm underline mb-4'
                onClick={() => setFilterAvailability([])}
              >
                Reset
              </button>
              <div>
                <label class='block'>
                  <input
                    type='checkbox'
                    checked={filterAvailability.includes('in-stock')}
                    onChange={() => toggleAvailabilityFilter('in-stock')}
                  />
                  <span class='ml-2'>In stock (26)</span>
                </label>
                <label class='block mt-2'>
                  <input
                    type='checkbox'
                    checked={filterAvailability.includes('out-of-stock')}
                    onChange={() => toggleAvailabilityFilter('out-of-stock')}
                  />
                  <span class='ml-2'>Out of stock (4)</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Sort By Menu */}
        <div class='ml-auto relative'>
          <label class='text-sm font-medium mr-2'>Sort by:</label>
          <select
            name='sort_by'
            id='SortBy'
            class='border rounded p-1 text-sm'
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value='best-selling'>Best selling</option>
            <option value='title-ascending'>Alphabetically, A-Z</option>
            <option value='title-descending'>Alphabetically, Z-A</option>
            <option value='price-ascending'>Price, low to high</option>
            <option value='price-descending'>Price, high to low</option>
            <option value='created-ascending'>Date, old to new</option>
            <option value='created-descending'>Date, new to old</option>
          </select>
        </div>

        {/* Product Count */}
        <p class='text-sm ml-4'>{filteredAndSortedProducts.length} products</p>
      </div>

      {/* Products Display */}
      <SelectedWorks
        products={filteredAndSortedProducts}
        title={title}
        lang={lang}
      />
    </>
  )
}
