export function formatAmount(currency: string, amount: number) {
  return Intl.NumberFormat().format(amount)
}