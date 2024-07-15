import generateRandomNumber from '../utils/generateRandomNumber.js';

const LottoRule = {
  lottoPrice: 1_000,
  limitPrice: 10_000_000,
  minNumber: 1,
  maxNumber: 45,
  defaultLength: 6,
  winLength: 7,
  winningInfo: {
    first: {
      prize: 2_000_000_000,
      checkBonus: false,
      accord: 6,
    },
    second: {
      prize: 30_000_000,
      checkBonus: true,
      accord: 5,
    },
    third: {
      prize: 1_500_000,
      checkBonus: false,
      accord: 5,
    },
    fourth: {
      prize: 50_000,
      checkBonus: false,
      accord: 4,
    },
    fifth: {
      prize: 5_000,
      checkBonus: false,
      accord: 3,
    },
  },
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
