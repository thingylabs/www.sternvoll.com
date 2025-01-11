// hooks/useProductVariants.ts
import { useState } from 'preact/hooks'
import type { Product } from '@/utils/types.ts'

export function useProductVariants(product: Product) {
  const [variant, setVariant] = useState(product.variants.nodes[0])
  const [chosenOptions, setChosenOptions] = useState<[string?, string?]>([])

  function findNode(v1: string, v2 = '') {
    return product.variants.nodes.find((node) => {
      if (product.options?.length === 2) {
        if (v2) {
          return node.selectedOptions?.[0].value === v1 &&
            node.selectedOptions?.[1].value === v2
        }
        return node.selectedOptions?.[0].value === v1 &&
          node.selectedOptions?.[1].value === product.options[1].values[0]
      }
      return node.selectedOptions?.[0].value === v1
    })
  }

  const handleOptionSelect = (value: string, optionIndex: number) => {
    let newVariant
    const isFirstOption = optionIndex === 0

    if (product.options?.length === 2) {
      if (isFirstOption) {
        const secondOption = chosenOptions[1] || product.options[1].values[0]
        newVariant = findNode(value, secondOption)
        setChosenOptions([value, secondOption])
      } else {
        const firstOption = chosenOptions[0] || product.options[0].values[0]
        newVariant = findNode(firstOption, value)
        setChosenOptions([firstOption, value])
      }
    } else {
      newVariant = findNode(value)
      setChosenOptions([value])
    }

    if (newVariant) {
      setVariant(newVariant)
    }
  }

  return {
    variant,
    chosenOptions,
    handleOptionSelect,
  }
}
