import {
  isDuplicated,
  throwErrorWithCondition,
  validate,
} from "../utils/index.js";

class Lotto {
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 45;
  static NUMBERS_SIZE = 6;

  #lottoNumbers;

  constructor(lottoNumbers) {
    Lotto.#validateLottoNumbers(lottoNumbers);

    this.#lottoNumbers = [...lottoNumbers];
  }

  get numbers() {
    return [...this.#lottoNumbers];
  }

  static isLessThanMinLottoNumber(number) {
    return number < Lotto.MIN_NUMBER;
  }

  static isGreaterThanMaxLottoNumber(number) {
    return Lotto.MAX_NUMBER < number;
  }

  static #validateLottoNumbers(lottoNumbers) {
    validate.array(lottoNumbers, "로또 번호로 적합하지 않은 값입니다.");

    throwErrorWithCondition(
      lottoNumbers.length !== Lotto.NUMBERS_SIZE,
      `로또 번호는 ${Lotto.NUMBERS_SIZE}개여야 합니다.`
    );

    throwErrorWithCondition(
      lottoNumbers.some((number) => !Number.isInteger(number)),
      "로또 번호 중에 적합하지 않은 값이 있습니다."
    );

    throwErrorWithCondition(
      lottoNumbers.some(Lotto.isLessThanMinLottoNumber),
      `로또 번호 중에 ${Lotto.MIN_NUMBER}보다 작은 번호가 있습니다.`
    );

    throwErrorWithCondition(
      lottoNumbers.some(Lotto.isGreaterThanMaxLottoNumber),
      `로또 번호 중에 ${Lotto.MAX_NUMBER}보다 큰 번호가 있습니다.`
    );

    throwErrorWithCondition(
      isDuplicated(lottoNumbers),
      "중복되는 로또 번호가 있습니다."
    );
  }
}

export default Lotto;
