import LottoRuleSet from '../domain/LottoRuleSet.js';
import { lottoRuleSetValidations } from '../validations/lottoRuleSet.js';

vi.mock('../domain/createLottoNumbers');

describe('로또 규칙 테스트', async () => {
  test('로또 규칙은 순위가 1위부터 최하위까지 올바르게 매겨져야 한다.', () => {
    const rankingRuleHasInvalidRank1 = [
      {
        matchCount: 3,
        bonusMatch: false,
        profit: 1000,
        rank: -1,
        distribute: 0.5,
      },
    ];
    expect(
      () =>
        new LottoRuleSet({
          initialRule: rankingRuleHasInvalidRank1,
        }),
    ).toThrow(lottoRuleSetValidations.validRanks.errorMessage);

    const rankingRuleHasInvalidRank2 = [
      {
        matchCount: 3,
        bonusMatch: false,
        profit: 1000,
        rank: 3,
        distribute: 0.5,
      },
    ];
    expect(
      () =>
        new LottoRuleSet({
          initialRule: rankingRuleHasInvalidRank2,
        }),
    ).toThrow(lottoRuleSetValidations.hasAllRanks.errorMessage);
  });

  test('로또 규칙에서 각 순위의 distribute 의 합은 1을 넘으면 안된다.', () => {
    const rankingRuleHasInvalidDistributeSum = [
      {
        bonusMatch: true,
        profit: 1000,
        rank: 1,
        matchCount: 3,
        distribute: 0.5,
      },
      {
        bonusMatch: true,
        profit: 1000,
        rank: 2,
        matchCount: 2,
        distribute: 0.4,
      },
      {
        bonusMatch: true,
        profit: 1000,
        rank: 3,
        matchCount: 1,
        distribute: 0.3,
      },
    ];
    expect(() => new LottoRuleSet({ initialRule: rankingRuleHasInvalidDistributeSum })).toThrow(
      lottoRuleSetValidations.distributeSum.errorMessage,
    );
  });

  test('로또 규칙에는 유효한 matchCount, bonus, profit, distribute 이 포함되어야 한다.', () => {
    const rankingRuleHasInvalidMatchCount = [
      {
        bonusMatch: true,
        profit: 1000,
        rank: 1,
        matchCount: 100,
        distribute: 0.5,
      },
    ];
    expect(
      () =>
        new LottoRuleSet({
          initialRule: rankingRuleHasInvalidMatchCount,
        }),
    ).toThrow(lottoRuleSetValidations.validMatchCounts.errorMessage);

    const rankingRuleHasInvalidBonusMatch = [
      {
        profit: 1000,
        rank: 1,
        matchCount: 3,
        bonusMatch: 'false',
      },
    ];
    expect(
      () =>
        new LottoRuleSet({
          initialRule: rankingRuleHasInvalidBonusMatch,
        }),
    ).toThrow(lottoRuleSetValidations.validBonusMatches.errorMessage);

    const rankingRuleHasInvalidProfit = [
      {
        bonusMatch: true,
        profit: '1000',
        rank: 1,
        matchCount: 3,
        distribute: 0.5,
      },
    ];
    expect(
      () =>
        new LottoRuleSet({
          initialRule: rankingRuleHasInvalidProfit,
        }),
    ).toThrow(lottoRuleSetValidations.validProfits.errorMessage);

    const rankingRuleHasInvalidDistribute = [
      {
        bonusMatch: true,
        profit: 1000,
        rank: 1,
        matchCount: 3,
        distribute: -1,
      },
    ];
    expect(
      () =>
        new LottoRuleSet({
          initialRule: rankingRuleHasInvalidDistribute,
        }),
    ).toThrow(lottoRuleSetValidations.validDistribute.errorMessage);
  });

  test('increaseRankProfit은 남은 액수와 distribute 비율을 기반으로 각 순위의 profit을 증가시켜야 한다.', () => {
    const initialRule = [
      {
        matchCount: 5,
        bonusMatch: true,
        profit: 1000,
        rank: 1,
        distribute: 0.6,
      },
      {
        matchCount: 5,
        bonusMatch: false,
        profit: 600,
        rank: 2,
        distribute: 0.4,
      },
    ];
    const lottoRuleSet = new LottoRuleSet({ initialRule: initialRule });

    lottoRuleSet.increaseRankProfit(1000);
    const updatedRules = lottoRuleSet.rules;

    expect(updatedRules.find(({ rank }) => rank === 1).profit).toBe(1600);
    expect(updatedRules.find(({ rank }) => rank === 2).profit).toBe(1000);
  });
});
