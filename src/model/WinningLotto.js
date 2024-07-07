import { isDuplicated, throwErrorWithCondition } from "../utils/index.js";
import Lotto from "./Lotto.js";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(lottoNumbers, bonusNumber) {
    super(lottoNumbers);
    WinningLotto.#validateBonusNumber(this.numbers, bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  static #validateBonusNumber(winningNumbers, bonusNumber) {
    throwErrorWithCondition(
      Lotto.isLessThanMinLottoNumber(bonusNumber),
      `보너스 번호는 ${Lotto.MIN_NUMBER}이상이어야 합니다.`
    );

    throwErrorWithCondition(
      Lotto.isGreaterThanMaxLottoNumber(bonusNumber),
      `보너스 번호는 ${Lotto.MAX_NUMBER}이하여야 합니다.`
    );

    throwErrorWithCondition(
      isDuplicated(winningNumbers.concat(bonusNumber)),
      "당첨 번호 중에 보너스 번호와 중복되는 번호가 있습니다."
    );
  }
}

export default WinningLotto;
