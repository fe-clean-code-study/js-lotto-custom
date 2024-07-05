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

    this.#winningCounts = LottoCalculator.#updateWinningCounts({
      winningCounts: this.#winningCounts,
      lottos,
      winningLotto,
    });
    this.#rateOfReturn = LottoCalculator.#calcRateOfReturn(
      this.#winningCounts,
      price
    );
  }

  get winningCounts() {
    return { ...this.#winningCounts };
  }

  get rateOfReturn() {
    return this.#rateOfReturn;
  }

  static #updateWinningCounts({ winningCounts, lottos, winningLotto }) {
    const copiedWinningCounts = { ...winningCounts };
    const lottoMatchResults = lottos.map((lotto) => ({
      matchedCount: LottoCalculator.#matchLottoNumbers(
        lotto.numbers,
        winningLotto.numbers
      ),
      isMatchedBonusNumber: lotto.numbers.includes(winningLotto.bonusNumber),
    }));

    return LottoCalculator.#countLottoWins(
      lottoMatchResults,
      copiedWinningCounts
    );
  }

  static #matchLottoNumbers(lottoNumber, winningLottoNumber) {
    return lottoNumber.filter((number) => winningLottoNumber.includes(number))
      .length;
  }

  static #countLottoWins(lottoMatchResults, winningCounts) {
    return lottoMatchResults.reduce(
      (counts, { matchedCount, isMatchedBonusNumber }) => {
        const prizeMap = {
          6: 1,
          5: isMatchedBonusNumber ? 2 : 3,
          4: 4,
          3: 5,
        };

        if (prizeMap[matchedCount]) {
          counts[prizeMap[matchedCount]] += 1;
        }

        return counts;
      },
      winningCounts
    );
  }

  static #calcRateOfReturn(winningCounts, price) {
    const sumOfPrize = Object.entries({ ...winningCounts })
      .map(([ranking, count]) => LottoCalculator.#LOTTO_PRIZES[ranking] * count)
      .reduce((acc, cur) => acc + cur, 0);

    return (sumOfPrize / price) * 100;
  }
}

export default LottoCalculator;
