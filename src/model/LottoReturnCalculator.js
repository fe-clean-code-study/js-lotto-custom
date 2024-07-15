import { LOTTO } from "../constants/index.js";

class LottoReturnCalculator {
  #rateOfReturn;

  constructor(winningCounts, price) {
    this.#rateOfReturn = LottoReturnCalculator.#calcRateOfReturn(
      winningCounts,
      price
    );
  }

  get rateOfReturn() {
    return this.#rateOfReturn;
  }

  static #calcRateOfReturn(winningCounts, price) {
    const sumOfPrize = Object.entries({ ...winningCounts })
      .map(
        ([ranking, count]) =>
          LottoReturnCalculator.#getPrizeMoney(ranking) * count
      )
      .reduce((acc, cur) => acc + cur, 0);

    return (sumOfPrize / price) * 100;
  }

  static #getPrizeMoney(ranking) {
    return LOTTO.RANKING_INFO.find((info) => info.ranking === Number(ranking))
      .prizeMoney;
  }
}

export default LottoReturnCalculator;
