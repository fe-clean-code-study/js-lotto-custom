import { describe, test, expect } from "vitest";

class Lotto {
  constructor(price) {
    if (typeof price !== "number") {
      throw new Error("로또 구입 금액으로 숫자를 입력해야 합니다.");
    }
  }
}

describe("Lotto 클래스 테스트.", () => {
  test("로또를 구입할 때 숫자가 아닌 값을 받으면 오류가 발생한다.", () => {
    expect(() => new Lotto("1")).toThrowError(
      "로또 구입 금액으로 숫자를 입력해야 합니다."
    );
  });
});
