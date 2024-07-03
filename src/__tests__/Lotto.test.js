import { describe, test, expect } from "vitest";
import { Lotto } from "../domain/index.js";

describe("Lotto 클래스 테스트.", () => {
  test.each([
    { value: 1 },
    { value: "1" },
    { value: true },
    { value: null },
    { value: undefined },
    { value: {} },
  ])(
    "로또 번호로 적합하지 않은 값($value)을 받으면 오류가 발생한다.",
    ({ value }) => {
      expect(() => new Lotto(value)).toThrowError(
        "로또 번호로 적합하지 않은 값입니다."
      );
    }
  );

  test("로또 번호가 6개 초과이면 오류가 발생한다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 6, 7])).toThrowError(
      "로또 번호는 6개여야 합니다."
    );
  });

  test("로또 번호가 6개 미만이면 오류가 발생한다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5])).toThrowError(
      "로또 번호는 6개여야 합니다."
    );
  });

  test("로또 번호 중에 숫자가 아닌 값이 있으면 오류가 발생한다.", () => {
    expect(() => new Lotto(["a", 1, 2, 3, 4, 5])).toThrowError(
      "로또 번호 중에 적합하지 않은 값이 있습니다."
    );
  });

  test("로또 번호 중에 1보다 작은 번호가 있으면 오류가 발생한다.", () => {
    expect(() => new Lotto([0, 2, 3, 4, 5, 45])).toThrowError(
      "로또 번호 중에 1보다 작은 번호가 있습니다."
    );
  });

  test("로또 번호 중에 45보다 큰 번호가 있으면 오류가 발생한다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrowError(
      "로또 번호 중에 45보다 큰 번호가 있습니다."
    );
  });

  test("로또 번호 중에 중복되는 번호가 있으면 오류가 발생한다.", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrowError(
      "중복되는 로또 번호가 있습니다."
    );
  });

  test("로또 번호를 가져옵니다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
