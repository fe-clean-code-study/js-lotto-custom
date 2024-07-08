import createReadline from '../utils/createReadline.js';

export default class ConsoleReader {
  constructor() {
    this.readLine = createReadline();
  }

  askQuestion(message) {
    return new Promise((resolve) => {
      this.readLine.question(message, (input) => {
        resolve(input);
      });
    });
  }

  findInputError(input, validations = []) {
    const { errorMessage } = validations.find(({ check }) => !check(input)) ?? {};
    return errorMessage;
  }

  read(message, validations = []) {
    const processInput = async () => {
      const input = await this.askQuestion(message);
      const errorMessage = this.findInputError(input, validations);

      if (errorMessage) {
        return processInput();
      }
      return input;
    };
    return processInput();
  }

  close() {
    this.readLine.close();
  }
}
