import { LottoMachine } from "../model/index.js";
import { inputManager } from "../service/index.js";

const purchaseLottos = async () => {
  const { price, count, lottos } = await inputManager.retryScan(
    "> 구입 금액을 입력해 주세요. ",
    (inputValue) => {
      const numValue = Number(inputValue);

      return new LottoMachine(numValue);
    }
  );

  return { price, count, lottos };
};

export default purchaseLottos;
