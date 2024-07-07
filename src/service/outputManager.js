class OutputManager {
  #outputFn;

  constructor(outputFn) {
    this.#outputFn = outputFn;
  }

  print(value) {
    this.#outputFn(`${value}`);
  }

  printAll(values, processFn) {
    values.forEach((value) => {
      const resultToPrint =
        typeof processFn === "function" ? processFn(value) : value;

      this.#outputFn(resultToPrint);
    });
  }

  linebreak() {
    this.#outputFn("");
  }
}

const outputManager = new OutputManager(console.log);

export default outputManager;
