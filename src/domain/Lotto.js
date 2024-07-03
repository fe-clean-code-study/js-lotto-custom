import { isDuplicated } from "../utils/index.js";

class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    Lotto.#validateLottoNumbers(lottoNumbers);

    this.#lottoNumbers = [...lottoNumbers];
  }

  static #validateLottoNumbers(lottoNumbers) {
    if (!Array.isArray(lottoNumbers)) {
      throw new Error("로또 번호로 적합하지 않은 값입니다.");
    }

    if (lottoNumbers.length !== 6) {
      throw new Error("로또 번호는 6개여야 합니다.");
    }

    if (lottoNumbers.some((number) => typeof number !== "number")) {
      throw new Error("로또 번호 중에 적합하지 않은 값이 있습니다.");
    }

    if (isDuplicated(lottoNumbers)) {
      throw new Error("중복되는 로또 번호가 있습니다.");
    }
  }
}

export default Lotto;
