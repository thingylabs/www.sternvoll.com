// components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div class='absolute inset-0 flex items-center justify-center bg-black/30'>
      <div class='w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin' />
    </div>
  )
}
