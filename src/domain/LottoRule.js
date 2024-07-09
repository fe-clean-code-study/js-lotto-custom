import { generateRandomNumberArray } from '../utils/Array.js';
import { changeStandardMoneyString } from '../utils/String.js';

export default class LottoRule {
  static RANK_BY_ACCORD = Object.freeze({
    3: { bonus: 5, base: 5 },
    4: { bonus: 4, base: 4 },
    5: { bonus: 2, base: 3 },
    6: { bonus: 1, base: 1 },
  });
  static REWARD = Object.freeze({
    1: 200000000,
    2: 30000000,
    3: 1500000,
    4: 50000,
    5: 5000,
  });
  static ACCROD_STRING_BY_RANK = Object.freeze({
    1: `6개 일치 ${changeStandardMoneyString(LottoRule.REWARD[1])}`,
    2: `5개 일치, 보너스 볼 일치 ${changeStandardMoneyString(LottoRule.REWARD[2])}`,
    3: `5개 일치 ${changeStandardMoneyString(LottoRule.REWARD[3])}`,
    4: `4개 일치 ${changeStandardMoneyString(LottoRule.REWARD[4])}`,
    5: `3개 일치 ${changeStandardMoneyString(LottoRule.REWARD[5])}`,
  });

  static get MAX_NUMBER() {
    return 45;
  }

  static get MIN_NUMBER() {
    return 1;
  }

  static get MONEY() {
    return 1000;
  }

  static get DEFAULT_LENGTH() {
    return 6;
  }

  static generateLottoNumber() {
    return generateRandomNumberArray(
      LottoRule.DEFAULT_LENGTH,
      LottoRule.MIN_NUMBER,
      LottoRule.MAX_NUMBER,
    );
  }

  static calculateQuantity(money) {
    const moneyError = LottoRule.getMoneyError(money);

    if (moneyError !== undefined) {
      throw new Error(moneyError);
    }

    return Math.floor(money / LottoRule.MONEY);
  }

  static getMoneyError(money) {
    if (typeof money !== 'number') {
      return '돈은 숫자 타입으로 입력받아야 합니다.';
    }

    if (money < LottoRule.MONEY) {
      return `구입금액은 최소 ${LottoRule.MONEY}원부터 가능합니다.`;
    }

    return undefined;
  }

  static getCommonLottoError(lotto) {
    if (Array.isArray(lotto) === false) {
      return 'lotto는 배열 형식이어야 합니다.';
    }

    if (
      lotto.some(
        (num) =>
          typeof num !== 'number' ||
          num < LottoRule.MIN_NUMBER ||
          num > LottoRule.MAX_NUMBER,
      )
    ) {
      return 'lotto배열의 요소는 숫자로 이뤄져야 합니다.';
    }

    return undefined;
  }
}
