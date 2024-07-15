import { readLineAsync } from "../utils/index.js";

class InputManager {
  #inputFn;

  constructor(inputFn) {
    this.#inputFn = inputFn;
  }

  async scan(query, processFn) {
    const inputValue = await this.#inputFn(query);

    return typeof processFn === "function" ? processFn(inputValue) : inputValue;
  }
}

const inputManager = new InputManager(readLineAsync);

export default inputManager;
