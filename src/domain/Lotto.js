class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    Lotto.#validateLottoNumbers(lottoNumbers);

    this.#lottoNumbers = [...lottoNumbers];
  }

  static #validateLottoNumbers(lottoNumbers) {
    const set = new Set(lottoNumbers);

    if (set.size !== lottoNumbers.length) {
      throw new Error("중복되는 번호가 있습니다.");
    }
  }
}

export default Lotto;
