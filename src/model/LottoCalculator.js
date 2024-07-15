import { LOTTO } from "../constants/index.js";

class LottoCalculator {
  #winningCounts;
  #rateOfReturn;

  constructor({ lottos, winningLotto }) {
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

    const price = lottos.length * LOTTO.PRICE;

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
      matchingCount: LottoCalculator.#matchLottoNumbers(
        lotto.numbers,
        winningLotto.numbers
      ),
      isBonusMatch: lotto.numbers.includes(winningLotto.bonusNumber),
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
      (counts, { matchingCount, isBonusMatch }) => {
        const ranking = LottoCalculator.#getRanking(
          matchingCount,
          isBonusMatch
        );

        if (ranking) {
          counts[ranking] += 1;
        }

        return counts;
      },
      winningCounts
    );
  }

  static #calcRateOfReturn(winningCounts, price) {
    const sumOfPrize = Object.entries({ ...winningCounts })
      .map(
        ([ranking, count]) => LottoCalculator.#getPrizeMoney(ranking) * count
      )
      .reduce((acc, cur) => acc + cur, 0);

    return (sumOfPrize / price) * 100;
  }

  static #getPrizeMoney(ranking) {
    return LOTTO.RANKING_INFO.find((info) => info.ranking === Number(ranking))
      .prizeMoney;
  }

  static #getRanking(matchingCount, isBonusMatch) {
    const currentInfo = LOTTO.RANKING_INFO.find(
      (info) =>
        info.matchingCount === matchingCount &&
        Boolean(info.isBonusMatch) === isBonusMatch
    );

    return currentInfo && currentInfo.ranking;
  }
}

export default LottoCalculator;
