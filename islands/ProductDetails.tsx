// islands/ProductDetails.tsx
import { useSignal } from '@preact/signals'
import { Product } from '@/utils/types.ts'
import { ProductHeader } from '@/components/product/ProductComponents.tsx'

interface ProductDetailsProps {
  product: Product
  country: string
  t: Record<string, string>
  imageFormat: string
}

export const translationKeys = [
  'Add to cart',
  'Size',
  'Please select a size',
  'Out of stock',
  'Additional Information',
] as const

export default function ProductDetails({
  product,
  country,
  t,
  imageFormat,
}: ProductDetailsProps) {
  const selectedOptions = useSignal<Record<string, string>>({})
  const isAddingToCart = useSignal(false)

  // Get all variant options - map them for easier access
  const variantOptions = (product.options ?? []).reduce((acc, option) => {
    if (option.name && option.values) {
      acc[option.name] = option.values
    }
    return acc
  }, {} as Record<string, string[]>)

  // Find the selected variant based on chosen options
  const getSelectedVariant = () => {
    const optionsLength = product.options?.length ?? 0
    if (Object.keys(selectedOptions.value).length !== optionsLength) {
      return null
    }

    return product.variants?.nodes?.find((variant) => {
      return variant.selectedOptions?.every(
        (option) => selectedOptions.value[option.name] === option.value,
      ) ?? false
    })
  }

  const handleOptionChange = (name: string, value: string) => {
    selectedOptions.value = {
      ...selectedOptions.value,
      [name]: value,
    }
  }

  const handleAddToCart = async () => {
    const variant = getSelectedVariant()
    if (!variant) return

    try {
      isAddingToCart.value = true
      // Add to cart logic here
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulated delay
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      isAddingToCart.value = false
    }
  }

  const selectedVariant = getSelectedVariant()
  const isOutOfStock = selectedVariant
    ? !selectedVariant.availableForSale
    : false
  const price = selectedVariant?.priceV2 || product.priceRange.minVariantPrice

  return (
    <div class='flex flex-col h-full'>
      <ProductHeader
        title={product.title}
        price={price}
      />

      {/* Product Options */}
      <div class='mt-8 space-y-4'>
        {Object.entries(variantOptions).map(([optionName, values]) => (
          <div key={optionName}>
            <label class='block text-sm font-medium text-gray-700 mb-2'>
              {optionName}
            </label>
            <div class='grid grid-cols-4 gap-2'>
              {values.map((value) => {
                const isSelected = selectedOptions.value[optionName] === value
                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(optionName, value)}
                    class={`px-4 py-2 text-sm border rounded-md transition-colors
                      ${
                      isSelected
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedVariant || isOutOfStock || isAddingToCart.value}
        class={`mt-8 w-full py-3 px-8 rounded-md text-white font-medium
          ${
          !selectedVariant || isOutOfStock
            ? 'bg-gray-400 cursor-not-allowed'
            : isAddingToCart.value
            ? 'bg-gray-600'
            : 'bg-gray-900 hover:bg-gray-800'
        }`}
      >
        {isOutOfStock
          ? t['Out of stock']
          : !selectedVariant
          ? t['Please select a size']
          : isAddingToCart.value
          ? '...'
          : t['Add to cart']}
      </button>

      {/* Product Description */}
      {product.descriptionHtml && (
        <div
          class='mt-8 prose prose-sm max-w-none'
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      )}
    </div>
  )
}
