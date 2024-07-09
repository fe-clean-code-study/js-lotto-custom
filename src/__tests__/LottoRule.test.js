import { describe, expect, test } from 'vitest';
import LottoRule from '../domain/LottoRule';

describe('LottoRule 클래스에 대한 단위 테스트 진행', () => {
  test('generateLottoNumber 메서드는 1~45 사이의 숫자로 이뤄진 6개의 배열을 반환한다.', () => {
    const lotto = LottoRule.generateLottoNumber();

    lotto.forEach((num) =>
      expect(num).greaterThanOrEqual(1).lessThanOrEqual(45),
    );
  });

  test.each([
    { money: 1000, answer: 1 },
    { money: 1222, answer: 1 },
    { money: 2000, answer: 2 },
  ])(
    `calculateQuantity 는 숫자 타입의 money($money) 를 받아 ${LottoRule.MONEY} 으로 나눈 몫($answer)을 반환한다.`,
    ({ money, answer }) => {
      expect(LottoRule.calculateQuantity(money)).toBe(answer);
    },
  );

  test.each([
    { money: '1000' },
    { money: {} },
    { money: [] },
    { money: function () {} },
  ])(
    'getMoneyError 는 money($money)가 숫자 타입이 아닌 경우 undefined 를 반환하지 않는다.',
    ({ money }) => {
      expect(LottoRule.getMoneyError(money)).toBeDefined();
    },
  );

  test.each([{ money: 0 }, { money: -100 }])(
    `getMoneyError 는 money($money)가 ${LottoRule.MONEY}보다 작은 숫자인 경우 undefined 를 반환하지 않는다.`,
    ({ money }) => {
      expect(LottoRule.getMoneyError(money)).toBeDefined();
    },
  );

  test.each([{ money: 10000 }, { money: 1000 }])(
    `getMoneyError 는 money($money)가 ${LottoRule.MONEY} 이상의 숫자인 경우 undefined 를 반환한다.`,
    ({ money }) => {
      expect(LottoRule.getMoneyError(money)).toBeUndefined();
    },
  );

  test.each([
    { lotto: 1 },
    { lotto: '1' },
    { lotto: {} },
    { lotto: undefined },
    { lotto: null },
    { lotto: function () {} },
  ])(
    'getCommonLottoError는 인자 lotto ($lotto) 가 배열 타입이 아닌 경우 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(LottoRule.getCommonLottoError(lotto)).toBeDefined();
    },
  );

  test.each([{ lotto: [1, 2, 3, 4, 5, 99] }, { lotto: [0, 1, 2, 3, 4, 5] }])(
    'getCommonLottoError는 인자 lotto ($lotto) 의 요소가 1~45사이의 숫자를 가지지 않은 경우 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(LottoRule.getCommonLottoError(lotto)).toBeDefined();
    },
  );

  test.each([{ lotto: [1, 2, 3, 4, 5, 6] }, { lotto: [1, 2, 3, 4, 5, 6, 7] }])(
    'getCommonLottoError 의 인자 lotto ($lotto) 가 위 조건을 모두 통과하면 undefined 를 반환한다.',
    ({ lotto }) => {
      expect(LottoRule.getCommonLottoError(lotto)).toBeUndefined();
    },
  );
});
