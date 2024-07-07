const formatCurrency = (number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
}

export default formatCurrency