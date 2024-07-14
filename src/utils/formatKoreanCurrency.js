const formatKoreanCurrency = (number) => {
  return new Intl.NumberFormat("ko-KR").format(number);
};

export default formatKoreanCurrency;
