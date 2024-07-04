import { isDuplicated } from "../utils/index.js";
import {
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_NUMBERS_SIZE,
} from "../constants/index.js";

class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    Lotto.#validateLottoNumbers(lottoNumbers);

    this.#lottoNumbers = [...lottoNumbers];
  }

  get numbers() {
    return [...this.#lottoNumbers];
  }

  static #validateLottoNumbers(lottoNumbers) {
    if (!Array.isArray(lottoNumbers)) {
      throw new Error("로또 번호로 적합하지 않은 값입니다.");
    }

    if (lottoNumbers.length !== LOTTO_NUMBERS_SIZE) {
      throw new Error(`로또 번호는 ${LOTTO_NUMBERS_SIZE}개여야 합니다.`);
    }

    if (lottoNumbers.some((number) => typeof number !== "number")) {
      throw new Error("로또 번호 중에 적합하지 않은 값이 있습니다.");
    }

    if (lottoNumbers.some((number) => number < MIN_LOTTO_NUMBER)) {
      throw new Error(
        `로또 번호 중에 ${MIN_LOTTO_NUMBER}보다 작은 번호가 있습니다.`
      );
    }

    if (lottoNumbers.some((number) => MAX_LOTTO_NUMBER < number)) {
      throw new Error(
        `로또 번호 중에 ${MAX_LOTTO_NUMBER}보다 큰 번호가 있습니다.`
      );
    }

    if (isDuplicated(lottoNumbers)) {
      throw new Error("중복되는 로또 번호가 있습니다.");
    }
  }
}

export default Lotto;
