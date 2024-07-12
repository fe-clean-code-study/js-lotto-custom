import { describe, expect, test } from 'vitest';
import Lotto from '../domain/Lotto.js';

describe('Lotto 도메인 클래스에 대한 단위 테스트', () => {
  const correctLotto = [1, 2, 3, 4, 5, 6];

  test('Lotto 클래스는 콤마로 숫자를 구분한 문자열로 초기화할 수 있다.', () => {
    const lotto = makeLottoMocking('1, 2, 3, 4, 5, 6');
    expect(lotto.accord(correctLotto)).toBe(6);
  });

  test('Lotto 클래스는 숫자 요소로 이뤄진 배열로 초기화할 수 있다.', () => {
    const lotto = makeLottoMocking([1, 2, 3, 4, 5, 6]);
    expect(lotto.accord(correctLotto)).toBe(6);
  });

  test('Lotto 클래스는 숫자로 치환할 수 잇는 문자 요소로 이뤄진 배열로 초기화할 수 있다.', () => {
    const lotto = makeLottoMocking(['1', '2', '3', '4', '5', '6']);
    expect(lotto.accord(correctLotto)).toBe(6);
  });

  test('Lotto 클래스는 숫자를 열거한 매개변수로 초기화할 수 있다.', () => {
    const lotto = makeLottoMocking(1, 2, 3, 4, 5, 6);
    expect(lotto.accord(correctLotto)).toBe(6);
  });

  test('Lotto 클래스는 문자열을 열거한 매개변수로 초기화할 수 있다.', () => {
    const lotto = makeLottoMocking('1', '2', '3', '4', '5', '6');
    expect(lotto.accord(correctLotto)).toBe(6);
  });
});

function makeLottoMocking(...lotto) {
  return new Lotto(...lotto);
}
