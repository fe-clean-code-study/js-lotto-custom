import { inputManager } from "../service/index.js";
import { WinningLotto } from "../model/index.js";

const createWinningLotto = async () => {
  const attachBonusNumber = await inputManager.retryScan(
    "> 당첨 번호를 입력해 주세요. ",
    (inputValue) => {
      const numbers = inputValue
        .split(",")
        .map((value) => Number(value.trim()));

      return new WinningLotto(numbers);
    }
  );

  const winningLotto = await inputManager.retryScan(
    "> 보너스 번호를 입력해 주세요. ",
    (inputValue) => {
      const bonusNumber = Number(inputValue);

      return attachBonusNumber(bonusNumber);
    }
  );

  return winningLotto;
};

export default createWinningLotto;
