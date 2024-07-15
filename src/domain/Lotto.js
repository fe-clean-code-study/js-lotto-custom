import createValidator from '../utils/createValidator.js';
import LottoValidator from '../validator/domain/LottoValidator.js';

export default class Lotto {
  lotto;

  constructor(...lotto) {
    this.set(...lotto);
  }

  static normalize(...lotto) {
    if (Array.isArray(lotto[0])) {
      lotto = lotto.flat();
    }
    if (lotto.length === 1) {
      lotto = lotto[0].split(',').map((number) => number.trim());
    }
    return [...lotto].map((number) => Number(number)).sort((a, b) => a - b);
  }

  get() {
    return [...this.lotto];
  }

  set(...lotto) {
    const validator = createValidator(LottoValidator);
    const normalizedLotto = Lotto.normalize(...lotto);

    validator({ common: normalizedLotto, defaultLotto: normalizedLotto });
    this.lotto = normalizedLotto;
  }

  accord(...compareLotto) {
    compareLotto = Lotto.normalize(...compareLotto);
    const set = new Set(
      this.lotto.length > compareLotto.length ? this.lotto : compareLotto,
    );
    const base =
      this.lotto.length > compareLotto.length ? compareLotto : this.lotto;

    return base.reduce((prev, curr) => (set.has(curr) ? prev + 1 : prev), 0);
  }
}
