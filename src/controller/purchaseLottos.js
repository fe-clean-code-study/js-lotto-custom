import { LottoMachine } from "../model/index.js";
import { inputManager, outputManager } from "../service/index.js";
import { retryOnFailureAsync } from "../utils/index.js";

const purchaseLottos = async () => {
  const { price, count, lottos } = await retryOnFailureAsync(
    async () => {
      const priceValue = await inputManager.scan(
        "> 구입 금액을 입력해 주세요. ",
        (inputValue) => {
          const trimedInputValue = inputValue.trim();

          return Number(trimedInputValue);
        }
      );

      return new LottoMachine(priceValue);
    },
    (error) => outputManager.print(error.message)
  );

  return { price, count, lottos };
};

export default purchaseLottos;
