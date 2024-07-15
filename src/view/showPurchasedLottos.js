import { outputManager } from "../service/index.js";

const showPurchasedLottos = (count, lottos) => {
  outputManager.print(`${count}개 구매했습니다.`);
  outputManager.printAll(lottos, (lottos) => lottos.numbers);
};

export default showPurchasedLottos;
