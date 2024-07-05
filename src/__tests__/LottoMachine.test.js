import { describe, test, expect } from "vitest";
import { LottoMachine } from "../domain/index.js";

describe("LottoMachine 클래스 테스트", () => {
  test("로또를 구입할 때 정수가 아닌 값을 받으면 오류가 발생한다.", () => {
    expect(() => new LottoMachine("1")).toThrowError(
      "로또 구입 금액으로 정수를 입력해야 합니다."
    );
  });

  test("로또를 구입할 때 1000원미만의 값을 받으면 오류가 발생한다.", () => {
    expect(() => new LottoMachine(999)).toThrowError(
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
      const lottoMachine = new LottoMachine(price);

      expect(lottoMachine.count).toBe(count);
    }
  );

  test("무작위 번호 6개가 적힌 로또를 받는다.", () => {
    const lottoMachine = new LottoMachine(1000);

    const lotto = lottoMachine.lottos[0];

    expect(lotto.numbers).toHaveLength(6);
  });
});
