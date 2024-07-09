import LottoRule from './LottoRule.js';

export default class Lotto {
  _lotto;

  constructor(lotto) {
    this.set(lotto);
  }

  set(lotto) {
    const lottoError = Lotto.getLottoError(lotto);

    if (lottoError !== undefined) {
      return lottoError;
    }

    this._lotto = lotto;
  }

  get() {
    return [...this._lotto];
  }

  static getLottoError(lotto) {
    const commonError = LottoRule.getCommonLottoError(lotto);

    if (commonError !== undefined) return commonError;

    const lottoSet = new Set(lotto);

    if (lottoSet.size !== Lotto.DEFAULT_LENGTH) {
      return `일반 로또 번호의 개수는 ${Lotto.DEFAULT_LENGTH}개 여야 합니다.`;
    }

    return undefined;
  }
}
