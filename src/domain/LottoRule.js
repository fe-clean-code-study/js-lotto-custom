import generateRandomNumber from '../utils/generateRandomNumber.js';

// 어떤 변수들은 대문자로 변경하는 게 좋지 않을까요
const LottoRule = {
  lottoPrice: 1000,
  limitPrice: 10_000_000,
  minNumber: 1,
  maxNumber: 45,
  defaultLength: 6,
  winLength: 7,
  exchange: (money) => {
    return Math.floor(money / LottoRule.lottoPrice);
  },
  generateLottoNumbers: () => {
    const set = new Set();

    while (set.size < LottoRule.defaultLength) {
      set.add(generateRandomNumber(LottoRule.minNumber, LottoRule.maxNumber));
    }

    return [...set];
  },
};

export default LottoRule;
