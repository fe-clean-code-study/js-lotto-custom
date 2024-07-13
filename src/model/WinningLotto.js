import { isDuplicated, throwErrorWithCondition } from "../utils/index.js";
import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);

    if (bonusNumber === undefined) {
      return (bonusNumber) => new WinningLotto(numbers, bonusNumber);
    }

    WinningLotto.#validateBonusNumber(this.numbers, bonusNumber);

    this.#bonusNumber = new LottoNumber(bonusNumber);
  }

  get bonusNumber() {
    return this.#bonusNumber.value;
  }

  static #validateBonusNumber(winningNumbers, bonusNumber) {
    throwErrorWithCondition(
      isDuplicated(winningNumbers.concat(bonusNumber)),
      "당첨 번호 중에 보너스 번호와 중복되는 번호가 있습니다."
    );
  }
}

export default WinningLotto;
