import createValidator from './createValidator.js';

export const lottoSystemValidations = {
  validRanks: {
    check: ({ rankingData }) => rankingData.every(({ rank }) => Number.isInteger(rank) && rank > 0),
    errorMessage: '랭킹 데이터에 유효하지 않은 값이(rank) 포함되어 있습니다.',
  },
  validMatchCounts: {
    check: ({ rankingData }) =>
      rankingData.every(({ matchCount }) => Number.isInteger(matchCount) && 0 < matchCount && matchCount <= 6),
    errorMessage: '랭킹 데이터에 유효하지 않은 값이(matchCount) 포함되어 있습니다.',
  },
  validBonusMatches: {
    check: ({ rankingData }) => rankingData.every(({ bonusMatch }) => bonusMatch === undefined || typeof bonusMatch === 'boolean'),
    errorMessage: '랭킹 데이터에 유효하지 않은 값이(bonusMatch) 포함되어 있습니다.',
  },
  validProfits: {
    check: ({ rankingData }) => rankingData.every(({ profit }) => Number.isInteger(profit) && profit > 0),
    errorMessage: '랭킹 데이터에 유효하지 않은 값이(profit) 포함되어 있습니다.',
  },
  hasAllRanks: {
    check: ({ rankingData }) => {
      const ranks = rankingData.map((data) => data.rank).sort((a, b) => a - b);
      return rankingData.length > 0 && ranks.every((rank, index) => rank === index + 1);
    },
    errorMessage: '랭킹 데이터에 모든 등수가 빠짐없이 있어야 합니다.',
  },
};

export const validateLottoSystem = createValidator(lottoSystemValidations);
