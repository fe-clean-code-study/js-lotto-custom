import LottoSystem from '../domain/LottoSystem.js';
import { lottoSystemValidations } from '../validations/lottoSystem.js';
import createLottoNumbers from '../domain/createLottoNumbers.js';

vi.mock('../domain/createLottoNumbers');

describe('로또 시스템 테스트', async () => {
  const originalCreateLottoNumbers = await vi
    .importActual('../domain/createLottoNumbers')
    .then((module) => module.default);

  beforeEach(() => {
    createLottoNumbers.mockReset();
    createLottoNumbers.mockImplementation(originalCreateLottoNumbers);
  });

  test('로또 시스템은 순위가 올바르게 매겨진 랭킹 규칙만 사용한다.', () => {
    const rankingRuleHasInvalidRank1 = [
      {
        matchCount: 3,
        bonusMatch: false,
        profit: 1000,
        rank: -1,
      },
    ];
    expect(
      () =>
        new LottoSystem({
          rankingRule: rankingRuleHasInvalidRank1,
        }),
    ).toThrow(lottoSystemValidations.validRanks.errorMessage);

    const rankingRuleHasInvalidRank2 = [
      {
        matchCount: 3,
        bonusMatch: false,
        profit: 1000,
        rank: 3,
      },
    ];
    expect(
      () =>
        new LottoSystem({
          rankingRule: rankingRuleHasInvalidRank2,
        }),
    ).toThrow(lottoSystemValidations.hasAllRanks.errorMessage);
  });

  test('로또 시스템은 유효한 matchCount, bonus, profit 이 포함된 랭킹 규칙만 사용한다.', () => {
    const rankingRuleHasInvalidMatchCount = [
      {
        bonusMatch: true,
        profit: 1000,
        rank: 1,
        matchCount: 100,
      },
    ];
    expect(
      () =>
        new LottoSystem({
          rankingRule: rankingRuleHasInvalidMatchCount,
        }),
    ).toThrow(lottoSystemValidations.validMatchCounts.errorMessage);

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
        new LottoSystem({
          rankingRule: rankingRuleHasInvalidBonusMatch,
        }),
    ).toThrow(lottoSystemValidations.validBonusMatches.errorMessage);

    const rankingRuleHasInvalidProfit = [
      {
        bonusMatch: true,
        profit: '1000',
        rank: 1,
        matchCount: 3,
      },
    ];
    expect(
      () =>
        new LottoSystem({
          rankingRule: rankingRuleHasInvalidProfit,
        }),
    ).toThrow(lottoSystemValidations.validProfits.errorMessage);
  });

  test('로또 시스템은 정확한 개수의 로또를 구매한다.', () => {
    const lottoSystem = new LottoSystem();
    lottoSystem.payLottoTicket(10000);

    expect(lottoSystem.ticketCount).toBe(10);
    expect(lottoSystem.paidAmount).toBe(10000);
  });

  test('로또 시스템은 발행한 로또들을 등수 별로 분류할 수 있다.', () => {
    createLottoNumbers
      .mockReturnValueOnce([1, 2, 3, 4, 5, 6]) // 1등
      .mockReturnValueOnce([1, 2, 3, 4, 5, 7]) // 2등
      .mockReturnValueOnce([1, 2, 3, 4, 5, 7]) // 2등
      .mockReturnValueOnce([1, 2, 3, 4, 15, 16]) // 4등
      .mockReturnValueOnce([1, 2, 3, 4, 15, 16]) // 4등
      .mockReturnValueOnce([1, 2, 3, 4, 15, 16]); // 4등

    const lottoSystem = new LottoSystem();
    lottoSystem.setWinningLotto([1, 2, 3, 4, 5, 6], 7);
    lottoSystem.payLottoTicket(6000);

    expect(lottoSystem.lottoRankingResult.find(({ rank }) => rank === 1).ticketList.length).toBe(1);
    expect(lottoSystem.lottoRankingResult.find(({ rank }) => rank === 2).ticketList.length).toBe(2);
    expect(lottoSystem.lottoRankingResult.find(({ rank }) => rank === 4).ticketList.length).toBe(3);
  });

  test('로또 시스템은 총 수익을 계산할 수 있다.', () => {
    createLottoNumbers
      .mockReturnValueOnce([1, 2, 3, 4, 5, 6]) // 1등
      .mockReturnValueOnce([1, 2, 3, 4, 15, 16]); // 4등

    const lottoSystem = new LottoSystem();
    lottoSystem.setWinningLotto([1, 2, 3, 4, 5, 6], 7);
    lottoSystem.payLottoTicket(2000);

    expect(lottoSystem.profitAmount).toBe(2000050000);
  });

  test('로또 시스템은 수익율을 계산할 수 있다.', () => {
    createLottoNumbers
      .mockReturnValueOnce([1, 2, 3, 4, 15, 16]) // 4등 = 50000
      .mockImplementation(() => [11, 12, 13, 14, 15, 16]);

    const lottoSystem = new LottoSystem();
    lottoSystem.setWinningLotto([1, 2, 3, 4, 5, 6], 7);
    lottoSystem.payLottoTicket(100000);

    expect(lottoSystem.profitRatio).toBe(50);
  });
});
