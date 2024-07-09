import { describe, expect, test } from 'vitest';
import WinLotto from '../domain/WinLotto';

describe('WinLotto 클래스 단위 테스트', () => {
  const initialLotto = [1, 2, 3, 4, 5, 6, 7];

  test('winLotto 를 초기화할 때 배열 길이가 7이 아니면 에러를 반환한다.', () => {
    expect(() => {
      makeWinLottoMockingData([1]);
    }).toThrow();
  });

  test('winLotto 를 초기화할 때 숫자로 이뤄진 배열이 아니면 에러를 반환한다.', () => {
    expect(() => {
      makeWinLottoMockingData(initialLotto.map(String));
    }).toThrow();
  });

  test('winLotto 를 초기화할 때 중복되는 숫자가 있으면 에러를 반환한다.', () => {
    expect(() => {
      makeWinLottoMockingData([1, 1, 2, 3, 4, 5, 6]);
    }).toThrow();
  });

  test('winLotto 가 위 조건을 모두 통과하면 에러를 반환하지 않는다.', () => {
    expect(() => {
      makeWinLottoMockingData(initialLotto);
    }).not.toThrow();
  });

  test.each([
    {
      lotto: [1, 2, 3, 4, 5, 6],
      rank: 1,
    },
    {
      lotto: [1, 2, 3, 4, 5, 7],
      rank: 2,
    },
    {
      lotto: [1, 2, 3, 4, 5, 8],
      rank: 3,
    },
    {
      lotto: [1, 2, 3, 4, 8, 9],
      rank: 4,
    },
    {
      lotto: [1, 2, 3, 8, 9, 10],
      rank: 5,
    },
  ])(
    'checkRank 메서드에 일반 로또($lotto)를 넣으면 당첨 로또와 일치하는 랭크($rank)를 반환한다.',
    ({ lotto, rank }) => {
      const winLotto = makeWinLottoMockingData(initialLotto);

      expect(winLotto.checkRank(lotto)).toBe(rank);
    },
  );

  test('get 메서드를 사용하면 현재 당첨 로또 번호 7자리를 가져온다.', () => {
    const winLotto = makeWinLottoMockingData(initialLotto);

    expect(winLotto.get()).toStrictEqual(initialLotto);
  });

  test('set 메서드를 사용하면 해당 로또 번호를 바꿀 수 있다.', () => {
    const winLotto = makeWinLottoMockingData(initialLotto);
    const nextLotto = [2, 3, 4, 5, 6, 7, 8];
    winLotto.set(nextLotto);

    expect(winLotto.get()).toStrictEqual(nextLotto);
  });

  test.each([
    { lotto: 1 },
    { lotto: '1' },
    { lotto: {} },
    { lotto: null },
    { lotto: undefined },
    { lotto: function () {} },
  ])(
    'WinLotto의 getLottoError 메서드는 인수인 lotto($lotto)가 배열이 아닌 경우 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(WinLotto.getLottoError(lotto)).toBeDefined();
    },
  );

  test.each([
    { lotto: [0, 1, 2, 3, 4, 5, 6] },
    { lotto: [1, 2, 3, 4, 5, 6, 99] },
  ])(
    'winLotto의 getLottoError 메서드는 1 미만, 45 초과 숫자가 하나라도 있으면 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(WinLotto.getLottoError(lotto)).toBeDefined();
    },
  );

  test.each([{ lotto: [1, 1, 2, 3, 4, 5, 6] }])(
    'winLotto의 getLottoError 메서드는 중복되는 숫자가 하나라도 있으면 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(WinLotto.getLottoError(lotto)).toBeDefined();
    },
  );

  test.each([{ lotto: [1, 2, 3, 4, 5] }, { lotto: [1, 2, 3, 4, 5, 6, 7, 8] }])(
    'winLotto의 getLottoError 메서드는 배열의 길이가 7이 아닌 경우 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(WinLotto.getLottoError(lotto)).toBeDefined();
    },
  );

  test.each([{ lotto: [1, 2, 3, 4, 5, 6, 7] }])(
    'winLotto의 getLottoError 메서드는 위 조건을 모두 충족하면 undefined 를 반환한다.',
    ({ lotto }) => {
      expect(WinLotto.getLottoError(lotto)).toBeUndefined();
    },
  );

  test.each([
    { bonusNumber: '1' },
    { bonusNumber: undefined },
    { bonusNumber: null },
    { bonusNumber: [] },
    { bonusNumber: {} },
    { bonusNumber: function () {} },
  ])(
    'winLotto 의 getBonusNumberError 는 bonusNumber($bonusNumber)가 숫자가 아닌 경우 undefined 를 반환하지 않는다.',
    ({ bonusNumber }) => {
      expect(WinLotto.getBonusNumberError(bonusNumber)).toBeDefined();
    },
  );

  test.each([{ bonusNumber: 0 }, { bonusNumber: 46 }])(
    'winLotto 의 getBonusNumberError 는 bonusNumber($bonusNumber)가 1~45 사이의 숫자가 아닌 경우 undefined 를 반환하지 않는다..',
    ({ bonusNumber }) => {
      expect(WinLotto.getBonusNumberError(bonusNumber)).toBeDefined();
    },
  );

  test('winLotto 의 getBonusNumberError 는 위 조건을 모두 통과하면 undefined 를 반환한다.', () => {
    expect(WinLotto.getBonusNumberError(4)).toBeUndefined();
  });
});

function makeWinLottoMockingData(initialLotto) {
  return new WinLotto(initialLotto);
}
