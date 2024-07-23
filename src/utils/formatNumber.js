const formatNumber = (number, digits = 2) => {
  return Number.isInteger(number) ? number : number.toFixed(digits);
};

export default formatNumber;
