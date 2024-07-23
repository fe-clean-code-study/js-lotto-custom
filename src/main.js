import {
  purchaseLottos,
  createWinningLotto,
  calculateWinningResults,
  shouldRestartGame,
} from "./controller/index.js";
import { showPurchasedLottos, showWinningResults } from "./view/index.js";

const main = async () => {
  do {
    const { count, lottos } = await purchaseLottos();

    showPurchasedLottos(count, lottos);

    const winningLotto = await createWinningLotto();
    const { winningCounts, rateOfReturn } = calculateWinningResults({
      lottos,
      winningLotto,
    });

    showWinningResults(winningCounts, rateOfReturn);
  } while (await shouldRestartGame());
};

main();
