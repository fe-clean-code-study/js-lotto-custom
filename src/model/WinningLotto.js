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
      "[ERR_003] WinningLotto 클래스의 생성자 인수인 winningNumbers 중에 bonusNumber와 중복됩니다."
    );
  }
}

export default WinningLotto;
