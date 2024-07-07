import { describe, expect, test } from "vitest";
import { WinningLotto } from "../model/index.js";

describe("WinningLotto 클래스 테스트", () => {
  test("보너스 번호가 1보다 작으면 오류가 발생한다.", () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 0;

    expect(() => new WinningLotto(lottoNumbers, bonusNumber)).toThrow(
      "보너스 번호는 1이상이어야 합니다."
    );
  });

  test("보너스 번호가 45보다 크면 오류가 발생한다.", () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 46;

    expect(() => new WinningLotto(lottoNumbers, bonusNumber)).toThrow(
      "보너스 번호는 45이하여야 합니다."
    );
  });

  test("당첨 번호 중에 보너스 번호와 중복되는 번호가 있으면 오류가 발생한다.", () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 6;

    expect(() => new WinningLotto(lottoNumbers, bonusNumber)).toThrow(
      "당첨 번호 중에 보너스 번호와 중복되는 번호가 있습니다."
    );
  });

  test("보너스 번호를 가져온다.", () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 45;

    const winningLotto = new WinningLotto(lottoNumbers, bonusNumber);

    expect(winningLotto.bonusNumber).toBe(45);
  });
});
