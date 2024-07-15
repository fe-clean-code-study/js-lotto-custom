const formatCurrency = (amount, currency = 'ko-KR') => {
  const formatter = new Intl.NumberFormat(currency, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

export default formatCurrency;
