import { validateLotto } from "../validations/lotto.js";
import LOTTO_TYPE from "../constants/lottoType.js";

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

export const createWinningLotto = (numbers, bonusNumber) => new Lotto({
  type: LOTTO_TYPE.WINNING,
  numbers, bonusNumber
})

export const createLottoTicket = (numbers) => new Lotto({
  type: LOTTO_TYPE.TICKET,
  numbers
})