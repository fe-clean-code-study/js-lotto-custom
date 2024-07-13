import {
  isDuplicated,
  throwErrorWithCondition,
  validate,
} from "../utils/index.js";
import LottoNumber from "./LottoNumber.js";

class Lotto {
  static #NUMBERS_SIZE = 6;

  #lottoNumbers;

  constructor(numbers) {
    Lotto.#validateNumbers(numbers);

    this.#lottoNumbers = numbers.map((number) => new LottoNumber(number));
  }

  get numbers() {
    return this.#lottoNumbers.map((lottoNumber) => lottoNumber.value);
  }

  static get NUMBERS_SIZE() {
    return Lotto.#NUMBERS_SIZE;
  }

  static #validateNumbers(lottoNumbers) {
    validate.array(lottoNumbers, "로또 번호로 적합하지 않은 값입니다.");

    throwErrorWithCondition(
      lottoNumbers.length !== Lotto.#NUMBERS_SIZE,
      `로또 번호는 ${Lotto.#NUMBERS_SIZE}개여야 합니다.`
    );

    throwErrorWithCondition(
      isDuplicated(lottoNumbers),
      "중복되는 로또 번호가 있습니다."
    );
  }
}

export default Lotto;
