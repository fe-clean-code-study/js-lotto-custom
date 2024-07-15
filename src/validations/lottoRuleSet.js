import createValidator from './createValidator.js';

export const lottoRuleSetValidations = {
  validRankList: {
    check: ({ initialRule }) => Array.isArray(initialRule),
    errorMessage: '로또 랭킹 규칙은 배열 형태여야 합니다.',
  },
  validRanks: {
    check: ({ initialRule }) => initialRule.every(({ rank }) => Number.isInteger(rank) && rank > 0),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(rank) 포함되어 있습니다.',
  },
  validMatchCounts: {
    check: ({ initialRule }) =>
      initialRule.every(({ matchCount }) => Number.isInteger(matchCount) && 0 < matchCount && matchCount <= 6),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(matchCount) 포함되어 있습니다.',
  },
  validBonusMatches: {
    check: ({ initialRule }) =>
      initialRule.every(({ bonusMatch }) => bonusMatch === undefined || typeof bonusMatch === 'boolean'),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(bonusMatch) 포함되어 있습니다.',
  },
  validProfits: {
    check: ({ initialRule }) => initialRule.every(({ profit }) => Number.isInteger(profit) && profit > 0),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(profit) 포함되어 있습니다.',
  },
  validDistribute: {
    check: ({ initialRule }) =>
      initialRule.every(({ distribute }) => distribute === undefined || (0 < distribute && distribute < 1)),
    errorMessage: '로또 랭킹 규칙에 유효하지 않은 값이(distribute) 포함되어 있습니다.',
  },
  distributeSum: {
    check: ({ initialRule }) => initialRule.reduce((sum, { distribute }) => sum + (distribute ?? 0), 0) <= 1,
    errorMessage: '로또 잔여금 분배율의 합은 1을 초과할 수 없습니다.',
  },
  hasAllRanks: {
    check: ({ initialRule }) => {
      const ranks = initialRule.map((data) => data.rank).sort((a, b) => a - b);
      return initialRule.length > 0 && ranks.every((rank, index) => rank === index + 1);
    },
    errorMessage: '로또 랭킹 규칙에 모든 등수가 빠짐없이 있어야 합니다.',
  },
};

export const validateLottoRuleSet = createValidator(lottoRuleSetValidations);
