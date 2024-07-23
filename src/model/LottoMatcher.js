import { LOTTO } from "../constants/index.js";

class LottoMatcher {
  #winningCounts;

  constructor(lottos, winningLotto) {
    this.#winningCounts = LottoMatcher.#calculateWinningCounts(
      lottos,
      winningLotto
    );
  }

  get winningCounts() {
    return { ...this.#winningCounts };
  }

  static #calculateWinningCounts(lottos, winningLotto) {
    const initialCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const lottoMatchResults = lottos.map((lotto) => ({
      matchingCount: LottoMatcher.#getMatchingCount(
        lotto.numbers,
        winningLotto.numbers
      ),
      isBonusMatch: lotto.numbers.includes(winningLotto.bonusNumber),
    }));

    return LottoMatcher.#updateWinningCounts(lottoMatchResults, initialCounts);
  }

  static #getMatchingCount(lottoNumber, winningLottoNumber) {
    return lottoNumber.filter((number) => winningLottoNumber.includes(number))
      .length;
  }

  static #updateWinningCounts(lottoMatchResults, winningCounts) {
    return lottoMatchResults.reduce(LottoMatcher.#updateCounts, winningCounts);
  }

  static #updateCounts(counts, { matchingCount, isBonusMatch }) {
    const ranking = LottoMatcher.#getRanking(matchingCount, isBonusMatch);

    if (ranking) {
      counts[ranking] += 1;
    }

    return counts;
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

export default LottoMatcher;
