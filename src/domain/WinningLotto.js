import { isDuplicated } from "../utils/index.js";
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
    if (Lotto.isLessThanMinLottoNumber(bonusNumber)) {
      throw new Error("보너스 번호는 1이상이어야 합니다.");
    }

    if (Lotto.isGreaterThanMaxLottoNumber(bonusNumber)) {
      throw new Error("보너스 번호는 45이하여야 합니다.");
    }

    if (isDuplicated(winningNumbers.concat(bonusNumber))) {
      throw new Error("당첨 번호 중에 보너스 번호와 중복되는 번호가 있습니다.");
    }
  }
}

export default WinningLotto;
