import { inputManager } from "../service/index.js";
import { Lotto, LottoNumber, WinningLotto } from "../model/index.js";
import { retryOnFailureAsync } from "../utils/index.js";
import handleErrorAndPrint from "./handleErrorAndPrint.js";

const createWinningLotto = async () => {
  const winningLotto = await retryOnFailureAsync(async () => {
    const winningNumbers = await retryCreateWinningNumbers();
    const bonusNumber = await retryCreateBonusNumber();

    return new WinningLotto(winningNumbers, bonusNumber);
  }, handleErrorAndPrint);

  return winningLotto;
};

export default createWinningLotto;

const retryCreateWinningNumbers = async () => {
  const winningNumbers = await retryOnFailureAsync(
    createWinningNumbers,
    handleErrorAndPrint
  );

  return winningNumbers;
};

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

const retryCreateBonusNumber = async () => {
  const bonusNumber = await retryOnFailureAsync(
    createBonusNumber,
    handleErrorAndPrint
  );

  return bonusNumber;
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
