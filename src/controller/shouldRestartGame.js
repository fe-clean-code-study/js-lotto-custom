import { inputManager } from "../service/index.js";

const shouldRestartGame = async () => {
  const restart = await confirmRestart();

  return restart === "y";
};

export default shouldRestartGame;

const confirmRestart = async () => {
  const inputValue = await inputManager.scan(
    "다시 시작하시겠습니까? (Yes: y, No: 아무키) ",
    (inputValue) => inputValue.trim().toLowerCase()
  );

  return inputValue;
};
