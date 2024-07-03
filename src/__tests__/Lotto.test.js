import { describe, test, expect } from "vitest";

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

describe("Lotto 클래스 테스트.", () => {
  test("로또를 구입할 때 숫자가 아닌 값을 받으면 오류가 발생한다.", () => {
    expect(() => new Lotto("1")).toThrowError(
      "로또 구입 금액으로 숫자를 입력해야 합니다."
    );
  });

  test("로또를 구입할 때 1000원미만의 값을 받으면 오류가 발생한다.", () => {
    expect(() => new Lotto(999)).toThrowError(
      "로또 구입 금액은 1000원이상이어야 합니다."
    );
  });

  test.each([
    { price: 1001, count: 1 },
    { price: 2500, count: 2 },
    { price: 3999, count: 3 },
    { price: 10999, count: 10 },
  ])(
    "로또를 $price원만큼 구매하면 $count장을 발행한다.",
    ({ price, count }) => {
      const lotto = new Lotto(price);

      expect(lotto.count).toBe(count);
    }
  );
});