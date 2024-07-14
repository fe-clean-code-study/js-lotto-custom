import { LottoCalculator } from "../model/index.js";

const calculateWinningResults = ({ lottos, winningLotto }) => {
  const { winningCounts, rateOfReturn } = new LottoCalculator({
    lottos,
    winningLotto,
  });

  return { winningCounts, rateOfReturn };
};

export default calculateWinningResults;
