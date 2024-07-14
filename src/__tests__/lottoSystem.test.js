import LottoSystem from '../domain/LottoSystem.js';
import { lottoSystemValidations } from '../validations/lottoSystem.js';
import createLottoNumbers from '../domain/createLottoNumbers.js';
import Lotto from '../domain/Lotto.js';

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

  test('로또 시스템에서 로또 티켓의 등수를 확인할 수 있다.', () => {
    const lottoSystem = new LottoSystem();
    lottoSystem.setWinningLotto([1, 2, 3, 4, 5, 6], 7);

    expect(lottoSystem.getRank(new Lotto([1, 2, 3, 4, 5, 6]))).toBe(1);
    expect(lottoSystem.getRank(new Lotto([1, 2, 3, 4, 5, 7]))).toBe(2);
    expect(lottoSystem.getRank(new Lotto([1, 2, 3, 4, 5, 8]))).toBe(3);
    expect(lottoSystem.getRank(new Lotto([1, 2, 3, 4, 7, 8]))).toBe(4);
    expect(lottoSystem.getRank(new Lotto([1, 2, 3, 7, 8, 9]))).toBe(5);
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
