import readlineAsync from '../utils/readline.js';
import InputValidator from '../validator/InputValidator.js';
import createValidator from '../validator/createValidator.js';

export default class Input {
  #rl;

  constructor() {
    this.#rl = readlineAsync;
    this.validator = createValidator(InputValidator);
  }

  async readInput(
    message,
    options = {
      postProcessFn: undefined,
      validate: undefined,
    },
  ) {
    try {
      const { postProcessFn, validate } = options;
      this.validator({ message, options, postProcessFn, validate });

      const input = await this.#rl(message);
      const postInput = postProcessFn ? postProcessFn(input) : input;
      validate && validate(postInput);

      return postInput;
    } catch (error) {
      console.log(error);

      return this.input(message, options);
    }
  }
}
