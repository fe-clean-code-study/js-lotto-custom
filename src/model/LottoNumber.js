import { throwErrorWithCondition, validate } from "../utils/index.js";

class LottoNumber {
  static #MIN_NUMBER = 1;
  static #MAX_NUMBER = 45;

  #number;

  constructor(number) {
    LottoNumber.#validateNumber(number);

    this.#number = number;
  }

  get value() {
    return this.#number;
  }

  static get MIN_NUMBER() {
    return LottoNumber.#MIN_NUMBER;
  }

  static get MAX_NUMBER() {
    return LottoNumber.#MAX_NUMBER;
  }

  static #validateNumber(number) {
    validate.integer(number, "로또 번호로 적합하지 않은 값입니다.");

    throwErrorWithCondition(
      number < LottoNumber.#MIN_NUMBER,
      `로또 번호는 ${LottoNumber.#MIN_NUMBER}보다 커야 합니다.`
    );

    throwErrorWithCondition(
      LottoNumber.#MAX_NUMBER < number,
      `로또 번호는 ${LottoNumber.#MAX_NUMBER}보다 작아야 합니다.`
    );
  }
}

export default LottoNumber;
