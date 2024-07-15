import { describe, expect, test } from "vitest";
import { LottoResult } from "../model/index.js";

describe("LottoResult 클래스 테스트", () => {
  test("수익률을 가져온다.", () => {
    const winningCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
    };
    const price = 2000;

    const { rateOfReturn } = new LottoResult(winningCounts, price);

    expect(rateOfReturn).toBe(250);
  });
});
