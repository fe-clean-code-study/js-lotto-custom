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

  static #countLotto(price) {
    return Math.floor(price / LOTTO.PRICE);
  }

  static #validatePrice(price) {
    validate.integer(price, "로또 구입 금액으로 정수를 입력해야 합니다.");

    throwErrorWithCondition(
      price < LOTTO.PRICE,
      `로또 구입 금액은 ${LOTTO.PRICE}원이상이어야 합니다.`
    );
  }
}

export default LottoMachine;
