export function formatAmount(currency: string, amount: number) {
  return symbol[currency] + Intl.NumberFormat().format(amount)
}

const symbol: any = {
  naira: "₦",
  dollar: "$"
}