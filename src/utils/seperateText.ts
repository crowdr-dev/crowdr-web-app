export function camelCaseToSeparated(value: string): string {
  const separated = value.replace(/([a-z])([A-Z])/g, "$1 $2");
  return separated.charAt(0).toUpperCase() + separated.slice(1);
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  }).format(value);
};
