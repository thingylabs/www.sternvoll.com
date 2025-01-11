// components/product/ColorSwatch.tsx
interface ColorSwatchProps {
  value: string
  isSelected: boolean
}

export function ColorSwatch({ value, isSelected }: ColorSwatchProps) {
  return (
    <span
      class={`border inline-block w-6 h-6 rounded-full mr-2 align-middle shadow-inner ${
        value === 'Gold'
          ? 'bg-yellow-300'
          : value === 'Rose gold'
          ? 'bg-pink-200'
          : value === 'White gold'
          ? 'bg-white'
          : value === 'Silver'
          ? 'bg-gray-200'
          : ''
      } ${isSelected ? '!border-primary' : 'border-secondary'}`}
      style={{
        backgroundImage: `
          linear-gradient(
            -45deg,
            transparent 20%,
            rgba(255,255,255,0.7) 35%,
            transparent 50%,
            transparent 60%,
            rgba(255,255,255,0.7) 75%,
            transparent 90%
          )
        `,
      }}
    />
  )
}
