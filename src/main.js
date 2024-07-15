import View from './View/View.js';
import Lotto from './domain/Lotto.js';
import LottoController from './domain/LottoController.js';
import WinLotto from './domain/WinLotto.js';

async function main() {
  const lottoController = new LottoController({
    view: View,
    lotto: Lotto,
    winLotto: WinLotto,
  });

  await lottoController.run();
}

main();

export default main;
