import {
  purchaseLottos,
  createWinningLotto,
  calculateWinningResults,
} from "./controller/index.js";
import { showPurchasedLottos, showWinningResults } from "./view/index.js";

const main = async () => {
  const { count, lottos } = await purchaseLottos();

  showPurchasedLottos(count, lottos);

  const winningLotto = await createWinningLotto();
  const { winningCounts, rateOfReturn } = calculateWinningResults({
    lottos,
    winningLotto,
  });

  showWinningResults(winningCounts, rateOfReturn);
};

main();
