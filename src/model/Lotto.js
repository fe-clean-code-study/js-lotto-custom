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
    validate.array(
      lottoNumbers,
      "[ERR_002] Lotto 클래스의 생성자 인수는 배열이어야 합니다."
    );

    throwErrorWithCondition(
      lottoNumbers.length !== LOTTO.NUMBERS_SIZE,
      `[ERR_002] Lotto 클래스의 생성자 인수의 길이는 ${LOTTO.NUMBERS_SIZE}이어야 합니다.`
    );

    throwErrorWithCondition(
      isDuplicated(lottoNumbers),
      "[ERR_002] Lotto 클래스의 생성자 인수인 배열에 중복되는 값이 있습니다."
    );
  }
}

export default Lotto;
