import createValidator from '../utils/createValidator.js';
import LottoValidator from '../validator/domain/LottoValidator.js';

export default class Lotto {
  #lotto;

  constructor(...lotto) {
    this.validator = createValidator(LottoValidator);
    this.setLotto(...lotto);
  }

  setLotto(...lotto) {
    if (Array.isArray(lotto[0])) {
      lotto = lotto.flat();
    }
    if (lotto.length === 1) {
      lotto = lotto[0].split(',').map((number) => number.trim());
    }
    const nextLotto = [...lotto]
      .map((number) => Number(number))
      .sort((a, b) => a - b);

    this.validator({ lotto: nextLotto });
    this.#lotto = [...nextLotto];
  }

  accord(compare) {
    compare.sort((a, b) => a - b);

    return compare.reduce(
      (prev, curr, index) => (curr === this.#lotto[index] ? prev + 1 : prev),
      0,
    );
  }

  get() {
    return [...this.#lotto];
  }
}
