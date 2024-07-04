class LottoCalculator {
  #winningCounts;

  constructor(lottos, winningLotto) {
    this.#winningCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    this.#updateWinningCounts(lottos, winningLotto);
  }

  get winningCounts() {
    return { ...this.#winningCounts };
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
}

export default LottoCalculator;
