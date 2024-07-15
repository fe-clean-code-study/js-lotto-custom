import { throwErrorWithCondition, validate } from "../utils/index.js";
import { LOTTO } from "../constants/index.js";

class LottoNumber {
  #number;

  constructor(number) {
    LottoNumber.#validateNumber(number);

    this.#number = number;
  }

  get value() {
    return this.#number;
  }

  static #validateNumber(number) {
    validate.integer(number, "로또 번호로 적합하지 않은 값입니다.");

    throwErrorWithCondition(
      number < LOTTO.MIN_NUMBER,
      `로또 번호는 ${LOTTO.MIN_NUMBER}보다 커야 합니다.`
    );

    throwErrorWithCondition(
      LOTTO.MAX_NUMBER < number,
      `로또 번호는 ${LOTTO.MAX_NUMBER}보다 작아야 합니다.`
    );
  }
}

export default LottoNumber;
