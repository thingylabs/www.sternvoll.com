// components/product/ProductOptions.tsx
import type { Product } from '@/utils/types.ts'
import { ColorSwatch } from '@/components/product/ColorSwatch.tsx'

interface ProductOptionsProps {
  product: Product
  chosenOptions: [string?, string?]
  onOptionSelect: (value: string, optionIndex: number) => void
}

export function ProductOptions({
  product,
  chosenOptions,
  onOptionSelect,
}: ProductOptionsProps) {
  return (
    <div className='w-full'>
      {product.options?.map((option, optionIndex) => (
        <div key={option.name} className='mb-4 flex flex-col sm:flex-row'>
          <div className='font-bold mb-2 sm:mb-0 sm:w-24 sm:flex-none sm:p-2'>
            {option.name}
          </div>
          <div className='flex flex-wrap gap-2'>
            {option.values.map((value, valueIndex) => (
              <button
                key={value}
                className={`flex items-center min-w-[120px] border-2 p-2 rounded-md transition-colors
                  ${
                  chosenOptions.includes(value) ||
                    (!chosenOptions.length && !valueIndex)
                    ? 'bg-secondary border-primary'
                    : 'border-secondary hover:border-primary/50'
                }`}
                onClick={() => onOptionSelect(value, optionIndex)}
              >
                {option.name === 'Color' && (
                  <ColorSwatch
                    value={value}
                    isSelected={chosenOptions.includes(value) ||
                      (!chosenOptions.length && !valueIndex)}
                  />
                )}
                <span>{value}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
