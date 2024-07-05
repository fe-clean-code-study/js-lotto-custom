class LottoCalculator {
  static #LOTTO_PRIZES = {
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50000,
    5: 5000,
  };

  #winningCounts;
  #rateOfReturn;

  constructor({ price, lottos, winningLotto }) {
    this.#winningCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    this.#updateWinningCounts(lottos, winningLotto);
    this.#calcRateOfReturn(price);
  }

  get winningCounts() {
    return { ...this.#winningCounts };
  }

  get rateOfReturn() {
    return this.#rateOfReturn;
  }

  #updateWinningCounts(lottos, winningLotto) {
    const result = lottos.map((lotto) => ({
      matchedCount: lotto.numbers.filter((number) =>
        winningLotto.numbers.includes(number)
      ).length,
      isMatchedBonus: lotto.numbers.includes(winningLotto.bonusNumber),
    }));

    result.forEach(({ matchedCount, isMatchedBonus }) => {
      if (matchedCount === 6) {
        this.#winningCounts[1] += 1;
      } else if (matchedCount === 5 && isMatchedBonus) {
        this.#winningCounts[2] += 1;
      } else if (matchedCount === 5) {
        this.#winningCounts[3] += 1;
      } else if (matchedCount === 4) {
        this.#winningCounts[4] += 1;
      } else if (matchedCount === 3) {
        this.#winningCounts[5] += 1;
      }
    });
  }

  #calcRateOfReturn(price) {
    const sumOfPrize = Object.entries(this.#winningCounts)
      .map(([ranking, count]) => LottoCalculator.#LOTTO_PRIZES[ranking] * count)
      .reduce((acc, cur) => acc + cur, 0);

    this.#rateOfReturn = (sumOfPrize / price) * 100;
  }
}

export default LottoCalculator;
