import { inputManager, outputManager } from "../service/index.js";
import { Lotto, LottoNumber, WinningLotto } from "../model/index.js";
import { retryOnFailureAsync } from "../utils/index.js";

const createWinningNumbers = async () => {
  const inputNumbers = await inputManager.scan(
    "> 당첨 번호를 입력해 주세요. ",
    (inputValue) =>
      inputValue
        .trim()
        .split(",")
        .map((value) => value.trim())
        .map((value) => Number(value))
  );

  const winningNumbers = new Lotto(inputNumbers);

  return winningNumbers.numbers;
};

const createBonusNumber = async () => {
  const inputNumber = await inputManager.scan(
    "> 보너스 번호를 입력해 주세요. ",
    (inputValue) => {
      const trimedInputValue = inputValue.trim();

      return Number(trimedInputValue);
    }
  );

  const bonusNumber = new LottoNumber(inputNumber);

  return bonusNumber.value;
};

const createWinningLotto = async () => {
  const winningNumbers = await retryOnFailureAsync(
    createWinningNumbers,
    (error) => outputManager.print(error.message)
  );

  const winningLotto = await retryOnFailureAsync(
    async () => {
      const bonusNumber = await createBonusNumber();

      return new WinningLotto(winningNumbers, bonusNumber);
    },
    (error) => outputManager.print(error.message)
  );

  return winningLotto;
};

export default createWinningLotto;
