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
    validate.integer(
      number,
      "[ERR_001] LottoNumber 클래스의 생성자 인수는 정수여야 합니다."
    );

    throwErrorWithCondition(
      number < LOTTO.MIN_NUMBER,
      `[ERR_001] LottoNumber 클래스의 생성자 인수는 ${LOTTO.MIN_NUMBER}이상이어야 합니다.`
    );

    throwErrorWithCondition(
      LOTTO.MAX_NUMBER < number,
      `[ERR_001] LottoNumber 클래스의 생성자 인수는 ${LOTTO.MAX_NUMBER}이하여야 합니다.`
    );
  }
}

export default LottoNumber;
