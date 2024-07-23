import { describe, expect, test } from "vitest";
import { LottoNumber } from "../model/index.js";

describe("LottoNumber 클래스 테스트", () => {
  test.each([
    { value: "a" },
    { value: true },
    { value: false },
    { value: undefined },
    { value: null },
    { value: [] },
    { value: {} },
  ])(
    "로또 번호로 적합하지 않은 값($value)을 할당하면 오류가 발생한다.",
    ({ value }) => {
      expect(() => new LottoNumber(value)).toThrowError(
        "[ERR_001] LottoNumber 클래스의 생성자 인수는 정수여야 합니다."
      );
    }
  );

  test("로또 번호가 1보다 작으면 오류가 발생한다.", () => {
    expect(() => new LottoNumber(0)).toThrowError(
      "[ERR_001] LottoNumber 클래스의 생성자 인수는 1이상이어야 합니다."
    );
  });

  test("로또 번호가 45보다 크면 오류가 발생한다.", () => {
    expect(() => new LottoNumber(46)).toThrowError(
      "[ERR_001] LottoNumber 클래스의 생성자 인수는 45이하여야 합니다."
    );
  });

  test("로또 번호를 정한다.", () => {
    const number = 1;

    const lottoNumber = new LottoNumber(number);

    expect(lottoNumber.value).toBe(1);
  });
});
