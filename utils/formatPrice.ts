export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("da", {
    style: "currency",
    currency: "DKK",
  }).format(amount);
};
