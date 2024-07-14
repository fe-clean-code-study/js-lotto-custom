import { validateLotto } from '../validations/lotto.js';
import LOTTO_TYPE from '../constants/lottoType.js';

export default class Lotto {
  constructor(lottoProps) {
    this.#setLotto(
      Array.isArray(lottoProps)
        ? {
            type: LOTTO_TYPE.TICKET,
            numbers: lottoProps,
          }
        : lottoProps,
    );
  }

  contain(number) {
    return [...this.numbers, this.bonusNumber].includes(number);
  }

  matchNumbers(otherLotto) {
    Lotto.#validateLotto(otherLotto);
    return this.numbers.filter((number) => otherLotto.numbers.includes(number));
  }

  #setLotto({ type, numbers, bonusNumber = null }) {
    Lotto.#validateLottoProps({ type, numbers, bonusNumber });
    this.type = type;
    this.numbers = numbers;
    this.bonusNumber = bonusNumber;
    this.#sortNumbers();
  }

  #sortNumbers() {
    this.numbers.sort((a, b) => a - b);
  }

  static #validateLottoProps(lottoProps) {
    validateLotto({
      target: lottoProps,
      validationKeys: [
        'lottoType',
        'lottoNumbersLength',
        'winningLottoHasBonus',
        'ticketLottoBonusNull',
        'lottoEachUnique',
        'lottoInteger',
        'lottoRange',
      ],
    });
  }

  static #validateLotto(lotto) {
    validateLotto({
      target: lotto,
      validationKeys: ['lottoInstance'],
    });
  }
}

export const createWinningLotto = (numbers, bonusNumber) =>
  new Lotto({
    type: LOTTO_TYPE.WINNING,
    numbers,
    bonusNumber,
  });

export const createLottoTicket = (numbers) =>
  new Lotto({
    type: LOTTO_TYPE.TICKET,
    numbers,
  });
