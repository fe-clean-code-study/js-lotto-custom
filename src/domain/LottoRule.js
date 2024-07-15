import generateRandomNumbers from '../utils/generateRandomNumbers.js';

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
    return generateRandomNumbers(
      LottoRule.defaultLength,
      LottoRule.minNumber,
      LottoRule.maxNumber,
    );
  },
};

export default LottoRule;
