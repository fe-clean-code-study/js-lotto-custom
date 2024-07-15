import { describe, test, expect } from 'vitest';
import WinLotto from '../domain/WinLotto';

describe('WinLotto 클래스에 대한 단위 테스트', () => {
  const correctLotto = [1, 2, 3, 4, 5, 6, 7];

  test('WinLotto 클래스의 lotto 프로퍼티를 콤마로 숫자를 구분한 문자열로 초기화할 수 있다.', () => {
    const winLotto = makeWinLottoMocking('1, 2, 3, 4, 5, 6, 7');
    expect(winLotto.accord(correctLotto)).toBe(7);
  });

  test('WinLotto 클래스의 lotto 프로퍼티를 숫자 요소로 이뤄진 배열로 초기화할 수 있다.', () => {
    const winLotto = makeWinLottoMocking([1, 2, 3, 4, 5, 6, 7]);
    expect(winLotto.accord(correctLotto)).toBe(7);
  });

  test('WinLotto 클래스의 lotto 프로퍼티를 숫자로 치환할 수 잇는 문자 요소로 이뤄진 배열로 초기화할 수 있다.', () => {
    const winLotto = makeWinLottoMocking(['1', '2', '3', '4', '5', '6', '7']);
    expect(winLotto.accord(correctLotto)).toBe(7);
  });

  test('WinLotto 클래스의 lotto 프로퍼티를 숫자를 열거한 매개변수로 초기화할 수 있다.', () => {
    const winLotto = makeWinLottoMocking(1, 2, 3, 4, 5, 6, 7);
    expect(winLotto.accord(correctLotto)).toBe(7);
  });

  test('WinLotto 클래스의 lotto 프로퍼티를 문자열을 열거한 매개변수로 초기화할 수 있다.', () => {
    const winLotto = makeWinLottoMocking('1', '2', '3', '4', '5', '6', '7');
    expect(winLotto.accord(correctLotto)).toBe(7);
  });

  test.each([
    { lotto: '안, 녕, 하, 세, 요, !, !' },
    { lotto: [1, 2, 3, 4, 5, '꽝', '꽝!'] },
  ])(
    '숫자로 치환할 수 없는 문자($lotto)로 초기화할 경우 에러를 반환한다.',
    ({ lotto }) => {
      expect(() => {
        makeWinLottoMocking(lotto);
      }).toThrowError('숫자로 변환할 수 없는 문자가 포함되어 있습니다.');
    },
  );

  test.each([
    { lotto: '1, 1, 2, 3, 4, 5, 6' },
    { lotto: [1, 1, 2, 3, 4, 5, 6] },
  ])('중복되는 숫자($lotto)로 초기화할 경우 에러를 반환한다.', ({ lotto }) => {
    expect(() => {
      makeWinLottoMocking(lotto);
    }).toThrowError('중복되는 숫자가 포함되어 있습니다.');
  });

  test.each([
    { lotto: '1' },
    { lotto: [1, 2, 3] },
    { lotto: '1, 2, 3, 4, 5, 6' },
    { lotto: [1, 2, 3, 4, 5, 6] },
  ])('로또번호($lotto)의 개수가 7이 아니면 에러를 반환한다.', ({ lotto }) => {
    expect(() => {
      makeWinLottoMocking(lotto);
    }).toThrowError('로또번호의 개수는 7개여야 합니다.');
  });

  test.each([
    { lotto: '0, 1, 2, 3, 4, 5, 6' },
    { lotto: '1, 2, 3, 4, 5, 6, 99' },
    { lotto: [0, 1, 2, 3, 4, 5, 6] },
    { lotto: [1, 2, 3, 4, 5, 6, 99] },
  ])(
    '로또번호($lotto)의 각 번호가 1~45 사이의 숫자가 아니면 에러를 반환한다.',
    ({ lotto }) => {
      expect(() => {
        makeWinLottoMocking(lotto);
      }).toThrowError('로또번호의 각 번호는 1~45 사이여야 합니다.');
    },
  );
});

function makeWinLottoMocking(...lotto) {
  return new WinLotto(...lotto);
}
