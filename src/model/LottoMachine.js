import {
  getRandomNumber,
  isDuplicated,
  throwErrorWithCondition,
  validate,
} from "../utils/index.js";
import Lotto from "./Lotto.js";

class LottoMachine {
  static #PRICE_PER_ONE = 1000;
  #price;
  #lottos;

  constructor(price) {
    LottoMachine.#validatePrice(price);
    this.#price = price;
    const count = LottoMachine.#countLotto(this.#price);
    this.#lottos = LottoMachine.#createLottos(count);
  }

  get price() {
    return this.#price;
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
    return getRandomNumber(Lotto.MIN_NUMBER, Lotto.MAX_NUMBER);
  }

  static #countLotto(price) {
    return Math.floor(price / LottoMachine.#PRICE_PER_ONE);
  }

  static #validatePrice(price) {
    validate.integer(price, "로또 구입 금액으로 정수를 입력해야 합니다.");

    throwErrorWithCondition(
      price < LottoMachine.#PRICE_PER_ONE,
      `로또 구입 금액은 ${LottoMachine.#PRICE_PER_ONE}원이상이어야 합니다.`
    );
  }
}

export default LottoMachine;
