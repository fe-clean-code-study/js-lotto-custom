import { validateLottoPayment } from "../validations/lottoPayment.js";
import createLottoNumbers from "./createLottoNumbers.js";
import {createLottoTicket} from "./Lotto.js";

export default class LottoPayment {
  #payAmount;
  constructor({ payAmount }) {
    LottoPayment.#validate({ payAmount })

    this.#payAmount = payAmount
  }

  static #validate(lottoPaymentProps) {
    validateLottoPayment({
      target: lottoPaymentProps
    })
  }

  get ticketCount() {
    return Math.floor(this.#payAmount / 1000)
  }

  createLottoTickets() {
    return Array.from({ length: this.ticketCount }, () => {
      const numbers = createLottoNumbers()
      return createLottoTicket(numbers)
    })
  }
}