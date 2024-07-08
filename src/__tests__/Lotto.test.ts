import { Lotto } from '../model/Lotto.js';

describe('Lotto 클래스', () => {
  describe('matchNumbers 메서드', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumbers = [2, 3, 4, 5, 6, 7];

    it('맞춘 숫자 개수와 보너스 번호 포함 여부를 정확하게 반환해야 한다', () => {
      const bonusNumber = 8;

      const { matchedCount, includedBonusNumber } = lotto.matchNumbers(
        winningNumbers,
        bonusNumber
      );

      expect(matchedCount).toBe(5);
      expect(includedBonusNumber).toBe(false);
    });

    it('보너스 번호가 포함된 경우 맞춘 숫자 개수와 보너스 번호 포함 여부를 정확하게 반환해야 한다', () => {
      const bonusNumber = 6;

      const { matchedCount, includedBonusNumber } = lotto.matchNumbers(
        winningNumbers,
        bonusNumber
      );

      expect(matchedCount).toBe(5);
      expect(includedBonusNumber).toBe(true);
    });
  });
});
