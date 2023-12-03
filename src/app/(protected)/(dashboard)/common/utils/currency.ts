export function formatAmount(amount: number, currency: string) {
  return symbol[currency] + Intl.NumberFormat().format(amount)
}

const symbol: any = {
  naira: "₦",
  dollar: "$"
}