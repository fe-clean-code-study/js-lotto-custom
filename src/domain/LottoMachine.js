import { getRandomNumber, isDuplicated, deepCopy } from "../utils/index.js";
import {
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_NUMBERS_SIZE,
} from "../constants/index.js";
import Lotto from "./Lotto.js";

class LottoMachine {
  static #PRICE_PER_ONE = 1000;
  #count;
  #lottos;

  constructor(price) {
    LottoMachine.#validatePrice(price);
    this.#count = LottoMachine.#countLotto(price);
    this.#lottos = LottoMachine.#createLottos(this.#count);
  }

  get count() {
    return this.#count;
  }

  get lottos() {
    const copiedLottos = deepCopy(this.#lottos);

    return copiedLottos;
  }

  static #createLottos(count) {
    return Array.from({ length: count }).map(() => {
      const lotto = LottoMachine.#createLotto();

      return lotto.numbers;
    });
  }

  static #createLotto() {
    const lottoNumbers = [];
    const addLottoNumber = (number) => {
      const nextLottoNumbers = lottoNumbers.concat(number);
      !isDuplicated(nextLottoNumbers) && lottoNumbers.push(number);
    };

    while (lottoNumbers.length < LOTTO_NUMBERS_SIZE) {
      const randomNumber = getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);

      addLottoNumber(randomNumber);
    }

    return new Lotto(lottoNumbers);
  }

  static #countLotto(price) {
    return Math.floor(price / LottoMachine.#PRICE_PER_ONE);
  }

  static #validatePrice(price) {
    if (typeof price !== "number") {
      throw new Error("로또 구입 금액으로 숫자를 입력해야 합니다.");
    }

    if (price < LottoMachine.#PRICE_PER_ONE) {
      throw new Error(
        `로또 구입 금액은 ${LottoMachine.#PRICE_PER_ONE}원이상이어야 합니다.`
      );
    }
  }
}

export default LottoMachine;
