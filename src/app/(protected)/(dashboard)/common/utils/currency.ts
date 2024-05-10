export function formatAmount(amount: number, currency: string, options?: Intl.NumberFormatOptions & {prefixSymbol?: boolean}) {
  if (options?.prefixSymbol === false) {
    return Intl.NumberFormat('en-US', options).format(amount)
  }

  return symbol[currency] + Intl.NumberFormat('en-US', options).format(amount)
}

const symbol: any = {
  naira: "₦",
  dollar: "$"
}