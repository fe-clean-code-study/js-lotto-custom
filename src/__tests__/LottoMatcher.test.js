import { describe, expect, test, vi } from "vitest";
import {
  LottoMachine,
  WinningLotto,
  LottoMatcher,
  Lotto,
} from "../model/index.js";
import { LOTTO } from "../constants/index.js";

describe("LottoMatcher 클래스 테스트", () => {
  test("1등부터 5등까지 당첨된 수를 가져온다.", () => {
    const { lottos } = new LottoMachine(6000);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const { winningCounts } = new LottoMatcher(lottos, winningLotto);

    expect(winningCounts).toHaveProperty("1");
    expect(winningCounts).toHaveProperty("2");
    expect(winningCounts).toHaveProperty("3");
    expect(winningCounts).toHaveProperty("4");
    expect(winningCounts).toHaveProperty("5");

    expect(typeof winningCounts[1]).toBe("number");
    expect(typeof winningCounts[2]).toBe("number");
    expect(typeof winningCounts[3]).toBe("number");
    expect(typeof winningCounts[4]).toBe("number");
    expect(typeof winningCounts[5]).toBe("number");
  });

  test("로또 번호 중에 1등 당첨이 하나있다.", () => {
    const { lottos } = createLottoMachineMock([[1, 2, 3, 4, 5, 6]]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const { winningCounts } = new LottoMatcher(lottos, winningLotto);

    expect(winningCounts).toHaveProperty("1", 1);
  });

  test("로또 번호 중에 2등 당첨이 하나있다.", () => {
    const { lottos } = createLottoMachineMock([[1, 2, 3, 4, 5, 7]]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const { winningCounts } = new LottoMatcher(lottos, winningLotto);

    expect(winningCounts).toHaveProperty("2", 1);
  });

  test("로또 번호 중에 3등 당첨이 하나있다.", () => {
    const { lottos } = createLottoMachineMock([[1, 2, 3, 4, 5, 8]]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const { winningCounts } = new LottoMatcher(lottos, winningLotto);

    expect(winningCounts).toHaveProperty("3", 1);
  });

  test("로또 번호 중에 4등 당첨이 하나있다.", () => {
    const { lottos } = createLottoMachineMock([[1, 2, 3, 4, 8, 9]]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const { winningCounts } = new LottoMatcher(lottos, winningLotto);

    expect(winningCounts).toHaveProperty("4", 1);
  });

  test("로또 번호 중에 5등 당첨이 하나있다.", () => {
    const { lottos } = createLottoMachineMock([[1, 2, 3, 8, 9, 10]]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const { winningCounts } = new LottoMatcher(lottos, winningLotto);

    expect(winningCounts).toHaveProperty("5", 1);
  });
});

function createLottoMachineMock(numbersArray) {
  const lottos = numbersArray.map((numbers) => new Lotto(numbers));
  const lottoMachineMock = vi.fn();
  lottoMachineMock.mockReturnValueOnce({
    price: lottos.length * LOTTO.PRICE,
    lottos,
  });

  return lottoMachineMock();
}
