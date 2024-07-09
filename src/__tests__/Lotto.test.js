import { describe, expect, test } from 'vitest';
import Lotto from '../domain/Lotto';

describe('Lotto 클래스에 대한 단위 테스트 작성', () => {
  const initialLotto = [1, 2, 3, 4, 5, 6];

  test.each([
    { lotto: '1' },
    { lotto: {} },
    { lotto: undefined },
    { lotto: null },
    { lotto: function () {} },
  ])(
    'lotto 초기화 시 인스턴스($lotto)가 배열이 아니면 에러를 반환한다.',
    ({ lotto }) => {
      expect(() => {
        makeLottoMockingData(lotto);
      }).toThrow();
    },
  );

  test.each([{ lotto: [0, 1, 2, 3, 4, 5] }, { lotto: [1, 2, 3, 4, 5, 99] }])(
    'lotto 초기화 시 인스턴스($lotto)의 요소가 1~45 범위를 벗어나는 숫자를 가지고 있으면 에러를 반환한다.',
    ({ lotto }) => {
      expect(() => {
        makeLottoMockingData(lotto);
      }).toThrow();
    },
  );

  test.each([{ lotto: [1, 2, 3, 4, 5, 5] }])(
    'lotto 초기화 시 인스턴스($lotto)의 요소에 중복되지 않는 6개의 숫자로 이뤄지지 않았다면 에러를 반환한다.',
    ({ lotto }) => {
      expect(() => {
        makeLottoMockingData(lotto);
      }).toThrow();
    },
  );

  test('lotto 초기화시 인스턴스가 위 조건을 모두 충족하면 에러를 반환하지 않는다.', () => {
    expect(() => {
      makeLottoMockingData([1, 2, 3, 4, 5, 6]);
    }).not.toThrow();
  });

  test('get 메서드는 현재 lotto 의 값을 가져올 수 있다.', () => {
    const lotto = makeLottoMockingData(initialLotto);

    expect(lotto.get()).toStrictEqual(initialLotto);
  });

  test('set 메서드는 현재 lotto 의 값을 바꿀 수 있다.', () => {
    const lotto = makeLottoMockingData(initialLotto);
    const nextLotto = [2, 3, 4, 5, 6, 7];
    lotto.set(nextLotto);

    expect(lotto.get()).toStrictEqual(nextLotto);
  });

  test.each([
    { lotto: '1' },
    { lotto: {} },
    { lotto: undefined },
    { lotto: null },
    { lotto: function () {} },
  ])(
    'getLottoError 메서드는 인수($lotto)가 배열이 아니면 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(Lotto.getLottoError(lotto)).toBeDefined();
    },
  );

  test.each([{ lotto: [0, 1, 2, 3, 4, 5] }, { lotto: [1, 2, 3, 4, 5, 99] }])(
    'getLottoError 메서드는 인수($lotto)가 1~45 사이의 숫자로 이뤄져 있지 않으면 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(Lotto.getLottoError(lotto)).toBeDefined();
    },
  );

  test.each([{ lotto: [1, 2, 3, 4, 5, 5] }, { lotto: [1, 2, 3, 4, 5] }])(
    'getLottoError 메서드는 인수($lotto)가 중복되지 않는 1~45사이의 6개의 숫자로 이뤄져 있지 않으면 undefined 를 반환하지 않는다.',
    ({ lotto }) => {
      expect(Lotto.getLottoError(lotto)).toBeDefined();
    },
  );

  test('getLottoError 메서드는 위 조건을 모두 충족하면 undefined 를 반환한다.', () => {
    expect(Lotto.getLottoError(initialLotto)).toBeUndefined();
  });
});

function makeLottoMockingData(initialLotto) {
  return new Lotto(initialLotto);
}
