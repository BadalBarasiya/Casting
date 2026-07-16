export const numberFormat = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
})

export const moneyFormat = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
})

export const getTodayDate = () => new Date().toISOString().slice(0, 10)
