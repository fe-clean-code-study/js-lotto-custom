import { LOTTO } from "../constants/index.js";
import {
  range,
  throwErrorWithCondition,
  validate,
  shuffle,
} from "../utils/index.js";
import Lotto from "./Lotto.js";

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

  static #validatePrice(price) {
    validate.integer(
      price,
      "[ERR_004] LottoMachine 클래스의 생성자 인수는 정수여야 합니다."
    );

    throwErrorWithCondition(
      price < LOTTO.PRICE,
      `[ERR_004] LottoMachine 클래스의 생성자 인수는 ${LOTTO.PRICE}이상이어야 합니다.`
    );
  }

  static #countLotto(price) {
    return Math.floor(price / LOTTO.PRICE);
  }

  static #createLottos(count) {
    return Array.from({ length: count }).map(LottoMachine.#createLotto);
  }

  static #createLotto() {
    const lottoNumbers = LottoMachine.#getLottoNumbers();
    const sortedlottoNumbers = [...lottoNumbers].sort((a, b) => a - b);

    return new Lotto(sortedlottoNumbers);
  }

  static #getLottoNumbers() {
    const lottoNumbers = range(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER + 1);

    return shuffle(lottoNumbers).slice(0, LOTTO.NUMBERS_SIZE);
  }
}

export default LottoMachine;
