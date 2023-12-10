export function formatAmount(amount: number, currency: string, options?: Intl.NumberFormatOptions) {
  return symbol[currency] + Intl.NumberFormat('en-US', options).format(amount)
}

const symbol: any = {
  naira: "₦",
  dollar: "$"
}