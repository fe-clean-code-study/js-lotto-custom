import { LOTTO } from "../constants/index.js";
import {
  isDuplicated,
  throwErrorWithCondition,
  validate,
} from "../utils/index.js";
import LottoNumber from "./LottoNumber.js";

class Lotto {
  #lottoNumbers;

  constructor(numbers) {
    Lotto.#validateNumbers(numbers);

    this.#lottoNumbers = numbers.map((number) => new LottoNumber(number));
  }

  get numbers() {
    return this.#lottoNumbers.map((lottoNumber) => lottoNumber.value);
  }

  static #validateNumbers(lottoNumbers) {
    validate.array(lottoNumbers, "로또 번호로 적합하지 않은 값입니다.");

    throwErrorWithCondition(
      lottoNumbers.length !== LOTTO.NUMBERS_SIZE,
      `로또 번호는 ${LOTTO.NUMBERS_SIZE}개여야 합니다.`
    );

    throwErrorWithCondition(
      isDuplicated(lottoNumbers),
      "중복되는 로또 번호가 있습니다."
    );
  }
}

export default Lotto;
