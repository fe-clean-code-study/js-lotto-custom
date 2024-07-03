class Lotto {
  static #PRICE_PER_ONE = 1000;

  #count;

  constructor(price) {
    if (typeof price !== "number") {
      throw new Error("로또 구입 금액으로 숫자를 입력해야 합니다.");
    }

    if (price < Lotto.#PRICE_PER_ONE) {
      throw new Error("로또 구입 금액은 1000원이상이어야 합니다.");
    }

    this.#count = Lotto.#countLotto(price);
  }

  get count() {
    return this.#count;
  }

  static #countLotto(price) {
    return Math.floor(price / Lotto.#PRICE_PER_ONE);
  }
}

export default Lotto;
