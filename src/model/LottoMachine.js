import { LOTTO_PRICE } from "../constants/index.js";
import {
  getRandomNumber,
  isDuplicated,
  throwErrorWithCondition,
  validate,
} from "../utils/index.js";
import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

class LottoMachine {
  #lottos;

  constructor(price) {
    LottoMachine.#validatePrice(price);

    const count = LottoMachine.#countLotto(price);
    this.#lottos = LottoMachine.#createLottos(count);
  }

  get count() {
    return this.#lottos.length;
  }

  get lottos() {
    return [...this.#lottos];
  }

  static #createLottos(count) {
    return Array.from({ length: count }).map(() => LottoMachine.#createLotto());
  }

  static #createLotto() {
    const lottoNumbers = LottoMachine.#getLottoNumbers();
    const sortedlottoNumbers = [...lottoNumbers].sort((a, b) => a - b);

    return new Lotto(sortedlottoNumbers);
  }

  static #getLottoNumbers() {
    const lottoNumbers = [];
    const addLottoNumber = (number) => {
      const nextLottoNumbers = lottoNumbers.concat(number);
      !isDuplicated(nextLottoNumbers) && lottoNumbers.push(number);
    };

    while (lottoNumbers.length < Lotto.NUMBERS_SIZE) {
      const lottoNumber = LottoMachine.#getLottoNumber();

      addLottoNumber(lottoNumber);
    }

    return lottoNumbers;
  }

  static #getLottoNumber() {
    return getRandomNumber(LottoNumber.MIN_NUMBER, LottoNumber.MAX_NUMBER);
  }

  static #countLotto(price) {
    return Math.floor(price / LOTTO_PRICE);
  }

  static #validatePrice(price) {
    validate.integer(price, "로또 구입 금액으로 정수를 입력해야 합니다.");

    throwErrorWithCondition(
      price < LOTTO_PRICE,
      `로또 구입 금액은 ${LOTTO_PRICE}원이상이어야 합니다.`
    );
  }
}

export default LottoMachine;
