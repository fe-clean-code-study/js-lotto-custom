import { isDuplicated, throwErrorWithCondition } from "../utils/index.js";
import Lotto from "./Lotto.js";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);

    WinningLotto.#validateBonusNumber(this.numbers, bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  static #validateBonusNumber(winningNumbers, bonusNumber) {
    throwErrorWithCondition(
      isDuplicated(winningNumbers.concat(bonusNumber)),
      "당첨 번호 중에 보너스 번호와 중복되는 번호가 있습니다."
    );
  }
}

export default WinningLotto;
