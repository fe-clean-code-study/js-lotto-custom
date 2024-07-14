import Lotto from '../domain/Lotto.js';
import { lottoValidations } from '../validations/lotto.js';
import LOTTO_TYPE from '../constants/lottoType.js';

describe('로또 테스트', () => {
  test('로또 번호는 [당첨, 티켓] 두가지 유형을 가질 수 있다.', () => {
    expect(
      () =>
        new Lotto({
          type: 'otherType',
          numbers: [1, 2, 3, 4, 5, 6],
        }),
    ).toThrow(lottoValidations.lottoType.errorMessage);
  });

  test('로또 번호는 6개여야 한다.', () => {
    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.TICKET,
          numbers: [1, 2, 3, 4, 5],
        }),
    ).toThrow(lottoValidations.lottoNumbersLength.errorMessage);
  });

  test('당첨 로또 번호는 보너스 번호를 가져야 한다.', () => {
    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.WINNING,
          numbers: [1, 2, 3, 4, 5, 6],
        }),
    ).toThrow(lottoValidations.winningLottoHasBonus.errorMessage);
  });

  test('티켓 로또 번호는 보너스 번호가 없어야 한다.', () => {
    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.TICKET,
          numbers: [1, 2, 3, 4, 5, 6],
          bonusNumber: 7,
        }),
    ).toThrow(lottoValidations.ticketLottoBonusNull.errorMessage);
  });

  test('로또 번호는 각각 달라야 한다.', () => {
    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.WINNING,
          numbers: [1, 2, 3, 4, 5, 6],
          bonusNumber: 6,
        }),
    ).toThrow(lottoValidations.lottoEachUnique.errorMessage);

    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.TICKET,
          numbers: [1, 2, 3, 3, 5, 6],
        }),
    ).toThrow(lottoValidations.lottoEachUnique.errorMessage);
  });

  test('모든 로또 번호는 정수여야 한다.', () => {
    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.TICKET,
          numbers: [1, 2, 3, 4, 5, '6'],
        }),
    ).toThrow(lottoValidations.lottoInteger.errorMessage);
  });

  test('모든 로또 번호는 1 이상 45 이하여야 한다.', () => {
    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.WINNING,
          numbers: [1, 2, 3, 4, 5, 45],
          bonusNumber: 46,
        }),
    ).toThrow(lottoValidations.lottoRange.errorMessage);

    expect(
      () =>
        new Lotto({
          type: LOTTO_TYPE.TICKET,
          numbers: [0, 1, 2, 3, 4, 5],
        }),
    ).toThrow(lottoValidations.lottoRange.errorMessage);
  });

  test('숫자 리스트를 통해 로또 티켓을 생성할 수 있다.', () => {
    expect(new Lotto([1, 2, 3, 4, 5, 6]).numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('로또에서 특정 번호가 포함되어있는지 여부를 알 수 있다.', () => {});
});
