import { LottoMachine } from "../model/index.js";
import { inputManager } from "../service/index.js";
import { retryOnFailureAsync } from "../utils/index.js";
import handleErrorAndPrint from "./handleErrorAndPrint.js";

const purchaseLottos = async () => {
  const { count, lottos } = await retryOnFailureAsync(async () => {
    const priceValue = await inputManager.scan(
      "> 구입 금액을 입력해 주세요. ",
      (inputValue) => {
        const trimedInputValue = inputValue.trim();

        return Number(trimedInputValue);
      }
    );

    return new LottoMachine(priceValue);
  }, handleErrorAndPrint);

  return { count, lottos };
};

export default purchaseLottos;
