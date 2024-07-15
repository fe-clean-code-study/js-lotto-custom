import createValidator from './createValidator.js';

export const lottoSystemValidations = {
  validRanks: {
    check: ({ rankingRule }) => rankingRule.every(({ rank }) => Number.isInteger(rank) && rank > 0),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(rank) 포함되어 있습니다.',
  },
  validMatchCounts: {
    check: ({ rankingRule }) =>
      rankingRule.every(({ matchCount }) => Number.isInteger(matchCount) && 0 < matchCount && matchCount <= 6),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(matchCount) 포함되어 있습니다.',
  },
  validBonusMatches: {
    check: ({ rankingRule }) => rankingRule.every(({ bonusMatch }) => bonusMatch === undefined || typeof bonusMatch === 'boolean'),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(bonusMatch) 포함되어 있습니다.',
  },
  validProfits: {
    check: ({ rankingRule }) => rankingRule.every(({ profit }) => Number.isInteger(profit) && profit > 0),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(profit) 포함되어 있습니다.',
  },
  hasAllRanks: {
    check: ({ rankingRule }) => {
      const ranks = rankingRule.map((data) => data.rank).sort((a, b) => a - b);
      return rankingRule.length > 0 && ranks.every((rank, index) => rank === index + 1);
    },
    errorMessage: '로또 랭킹 규칙에 모든 등수가 빠짐없이 있어야 합니다.',
  },
};

export const validateLottoSystem = createValidator(lottoSystemValidations);
