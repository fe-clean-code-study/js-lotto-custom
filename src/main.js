import {
  purchaseLottos,
  createWinningLotto,
  calculateWinningResults,
} from "./controller/index.js";
import { showPurchasedLottos, showWinningResults } from "./view/index.js";

const main = async () => {
  const { price, count, lottos } = await purchaseLottos();

  showPurchasedLottos(count, lottos);

  const winningLotto = await createWinningLotto();
  const { winningCounts, rateOfReturn } = calculateWinningResults({
    price,
    lottos,
    winningLotto,
  });

  showWinningResults(winningCounts, rateOfReturn);
};

main();
