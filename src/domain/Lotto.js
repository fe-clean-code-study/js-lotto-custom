import { validateLotto } from "../validations/lotto.js";

export default class Lotto{
  constructor({ type, numbers, bonusNumber = null }) {
    Lotto.#validate({ type, numbers, bonusNumber })

    this.type = type
    this.numbers = numbers
    this.bonusNumber = bonusNumber
  }

  static #validate(lottoProps) {
    validateLotto({
      target: lottoProps
    })
  }
}

