// utils/shopifySrcset.ts
export function srcset(name: string, width: number, height: number) {
  return `
    webp_${name}: url(transform: {preferredContentType: WEBP, maxWidth: ${width}, maxHeight: ${height}})
    webp_${name}_2x: url(transform: {preferredContentType: WEBP, maxWidth: ${width}, maxHeight: ${height}, scale: 2})
    jpg_${name}: url(transform: {preferredContentType: JPG, maxWidth: ${width}, maxHeight: ${height}})
    jpg_${name}_2x: url(transform: {preferredContentType: JPG, maxWidth: ${width}, maxHeight: ${height}, scale: 2})
  `
}
