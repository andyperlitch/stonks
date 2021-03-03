export const centsToPrice = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`.replace(
    /(\d)(?=(\d{3})+\.\d\d$)/g,
    '$1,',
  )
}
