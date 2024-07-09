import { describe, it, expect, beforeEach, vi } from "vitest";
import { setupLotto } from "./setting";

let makeLottoCount,
  makeLottoList,
  makeCheckSchema,
  makeLottoResult,
  makeWinAmount,
  totalAmount,
  makeRateOfReturn;

beforeEach(() => {
  ({
    makeCheckSchema,
    makeLottoCount,
    makeLottoList,
    makeLottoResult,
    makeRateOfReturn,
    makeWinAmount,
    totalAmount,
  } = setupLotto());
});

describe("Lotto", () => {
  it.each([
    [1000, 1],
    [1500, 1],
    [3000, 3],
    [5000, 5],
  ])("금액(%d)에 따라 로또 개수(%d)가 정해집니다.", (money, count) => {
    const result = makeLottoCount(money);

    expect(result).toEqual(count);
  });

  it.each([2, 3, 4, 0])("개수(%d)에 따라 로또를 생성합니다.", (count) => {
    const lotto = vi.fn(() => []);
    const result = makeLottoList(count, lotto);

    expect(result.length).toEqual(count);
  });

  it("당첨 번호에 보너스 번호가 포함되면 에러가 발생합니다.", () => {
    const winNumberList = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 1;

    expect(() => makeCheckSchema(winNumberList, bonusNumber)).toThrowError(
      "잘못된 입력입니다."
    );
  });

  it("checkSchema의 당첨 번호는 true를 반환해야 합니다.", () => {
    const winNumberList = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 45;
    const checkSchema = makeCheckSchema(winNumberList, bonusNumber);

    winNumberList.forEach((winNumberItem) => {
      expect(checkSchema["winSchema"][winNumberItem]).toEqual(true);
    });
  });

  it("당첨 규칙에 맞는 개수가 증가해야 합니다.", () => {
    const first = [1, 2, 3, 4, 5, 6];
    const second = [1, 2, 3, 4, 5, 45];
    const third = [1, 2, 3, 4, 5, 7];
    const fourth = [1, 2, 3, 4, 7, 8];
    const fifth = [1, 2, 3, 7, 8, 9];

    const lottoList = [first, second, third, fourth, fifth];

    const winNumberList = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 45;
    const checkSchema = makeCheckSchema(winNumberList, bonusNumber);
    const lottoResult = makeLottoResult(lottoList, checkSchema);

    expect(lottoResult).toEqual({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
  });

  it("당첨 개수에 맞는 금액을 반환해야 합니다.", () => {
    const lottoResult = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 };
    const result = makeWinAmount(lottoResult);

    expect(result).toBe(totalAmount);
  });

  it.each([
    [0, 1000, 0],
    [10000, 5000, 200],
    [5000, 1000, 500],
    [500, 1000, 50],
  ])(
    "당첨 금액 (%d)과 구입 금액 (%d)에 맞는 수익률 (%d)을 반환해야 합니다.",
    (winAmount, money, rateOfReturn) => {
      const result = makeRateOfReturn(winAmount, money);

      expect(result).toBe(rateOfReturn);
    }
  );
});
