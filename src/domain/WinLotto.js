import Lotto from './Lotto.js';
import LottoRule from './LottoRule.js';
import { accord } from '../utils/Array.js';

export default class WinLotto extends Lotto {
  _winLotto;

  constructor(lotto) {
    super(lotto);
    this.set(lotto);
  }

  static get DEFAULT_LENGTH() {
    return 7;
  }

  set(lotto) {
    const lottoError = WinLotto.getLottoError(lotto);

    if (lottoError !== undefined) {
      throw new Error(lottoError);
    }

    this._winLotto = lotto;
  }

  get() {
    return [...this._winLotto];
  }

  checkRank(compareLotto) {
    const compareLottoError = Lotto.getLottoError(compareLotto);
    const winLottoError = WinLotto.getLottoError(this._winLotto);

    if (compareLottoError !== undefined || winLottoError !== undefined) {
      return compareLottoError || winLottoError;
    }

    const accordCount = accord(
      this.get().slice(0, LottoRule.DEFAULT_LENGTH),
      compareLotto,
    );
    const isBonusCorrect = compareLotto.includes(this._winLotto.at(-1));

    return isBonusCorrect
      ? LottoRule.RANK_BY_ACCORD[accordCount].bonus
      : LottoRule.RANK_BY_ACCORD[accordCount].base;
  }

  static getLottoError(lotto) {
    const commonError = LottoRule.getCommonLottoError(lotto);

    if (commonError !== undefined) {
      return commonError;
    }

    const lottoSet = new Set(lotto);

    if (lottoSet.size !== WinLotto.DEFAULT_LENGTH) {
      return `당첨 로또 번호의 개수는 ${WinLotto.DEFAULT_LENGTH}개 여야 합니다.`;
    }

    return undefined;
  }

  static getBonusNumberError(bonusNumber) {
    if (typeof bonusNumber !== 'number') {
      return 'bonusNumber 가 숫자가 아닙니다.';
    }

    if (
      bonusNumber < LottoRule.MIN_NUMBER ||
      LottoRule.MAX_NUMBER < bonusNumber
    ) {
      return 'bonusNumber 는 1 ~ 45 사이여야 합니다.';
    }

    return undefined;
  }
}
