export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("da").format(digit);
};
