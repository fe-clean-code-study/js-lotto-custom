import Lotto from './Lotto.js';
import LottoValidator from '../validator/domain/LottoValidator.js';
import createValidator from '../utils/createValidator.js';

export default class WinLotto extends Lotto {
  constructor(...lotto) {
    super(...lotto);
  }

  set(...lotto) {
    const validator = createValidator(LottoValidator);
    const normalizedLotto = Lotto.normalize(...lotto);

    validator({ common: normalizedLotto, winLotto: normalizedLotto });
    this.lotto = normalizedLotto;
  }
}
