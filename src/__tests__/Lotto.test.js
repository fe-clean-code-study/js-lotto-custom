import { describe, test, expect } from "vitest";
import { Lotto } from "../domain/index.js";

describe("Lotto 클래스 테스트.", () => {
  test("로또 번호 중에 중복되는 번호가 있으면 오류가 발생한다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrowError(
      "중복되는 번호가 있습니다."
    );
  });
});
