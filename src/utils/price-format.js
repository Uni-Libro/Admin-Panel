// price Formatter
const formatterInstance = new Intl.NumberFormat("fa-IR", {
  maximumSignificantDigits: 3,
});
export const priceFormatter = (value) => {
  return formatterInstance.format(value);
};
