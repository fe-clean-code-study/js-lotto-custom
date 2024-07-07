import { LottoCalculator } from "../model/index.js";

const calculateWinningResults = ({ price, lottos, winningLotto }) => {
  const { winningCounts, rateOfReturn } = new LottoCalculator({
    price,
    lottos,
    winningLotto,
  });

  return { winningCounts, rateOfReturn };
};

export default calculateWinningResults;
