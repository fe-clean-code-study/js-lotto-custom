import { LottoController } from './controller/LottoController.js';
import { LottoView } from './View/LottoView.js';

async function main() {
  const view = new LottoView();
  const controller = new LottoController(view);
  controller.setLottoRule();
  await controller.purchaseTickets();
  controller.displayTickets();
  await controller.setWinningNumbers();
  controller.displayResult();
}

await main();
