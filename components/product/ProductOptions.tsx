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
    <div>
      {product.options?.map((option, optionIndex) => (
        <div key={option.name} class='flex items-start w-full'>
          <div class='flex-none w-24 font-bold p-2'>
            {option.name}
          </div>
          <div class='flex flex-wrap items-start'>
            {option.values.map((value, valueIndex) => (
              <div
                key={value}
                style='text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);'
                class={`border-2 cursor-pointer border-secondary border-solid p-2 mr-2 rounded-md ${
                  chosenOptions.includes(value) ||
                    (!chosenOptions.length && !valueIndex)
                    ? 'bg-secondary !border-primary text-shadow-white'
                    : ''
                } ${optionIndex ? 'mt-2' : ''}`}
                onClick={() => onOptionSelect(value, optionIndex)}
              >
                {option.name === 'Color' && (
                  <ColorSwatch
                    value={value}
                    isSelected={chosenOptions.includes(value) ||
                      (!chosenOptions.length && !valueIndex)}
                  />
                )}
                <span class='align-middle'>{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
