import { isDuplicated } from "../utils/index.js";

class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    Lotto.#validateLottoNumbers(lottoNumbers);

    this.#lottoNumbers = [...lottoNumbers];
  }

  static #validateLottoNumbers(lottoNumbers) {
    if (isDuplicated(lottoNumbers)) {
      throw new Error("중복되는 번호가 있습니다.");
    }
  }
}

export default Lotto;
