import { LOTTO } from "../constants/index.js";
import { LottoMatcher, LottoResult } from "../model/index.js";

const calculateWinningResults = ({ lottos, winningLotto }) => {
  const { winningCounts } = new LottoMatcher(lottos, winningLotto);

  const price = lottos.length * LOTTO.PRICE;

  const { rateOfReturn } = new LottoResult(winningCounts, price);

  return { winningCounts, rateOfReturn };
};

export default calculateWinningResults;
