import { inputManager, outputManager } from "../service/index.js";
import {
  retryOnFailureAsync,
  throwErrorWithCondition,
} from "../utils/index.js";

const shouldRestartGame = async () => {
  const restart = await retryOnFailureAsync(confirmRestart, (error) =>
    outputManager.print(error.message)
  );

  return restart === "y";
};

export default shouldRestartGame;

const confirmRestart = async () => {
  const inputValue = await inputManager.scan(
    "다시 시작하시겠습니까? (y/n) ",
    (inputValue) => inputValue.trim().toLowerCase()
  );

  validateRestartInput(inputValue);

  return inputValue;
};

const validateRestartInput = (inputValue) => {
  throwErrorWithCondition(
    inputValue !== "n" && inputValue !== "y",
    "잘못된 입력입니다."
  );
};
