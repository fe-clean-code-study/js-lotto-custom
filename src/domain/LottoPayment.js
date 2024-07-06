import { validateLottoPayment } from "../validations/lottoPayment.js";
import createLottoNumbers from "./createLottoNumbers.js";
import Lotto from "./Lotto.js";

export default class LottoPayment {
  #payAmount;
  constructor({ payAmount }) {
    LottoPayment.#validate({ payAmount })

    this.#payAmount = payAmount
    this.paidTickets = this.createLottoTickets()
  }

  static #validate(lottoPaymentProps) {
    validateLottoPayment({
      target: lottoPaymentProps
    })
  }

  get ticketCount() {
    return this.#payAmount / 1000
  }

  createLottoTickets() {
    return Array.from({ length: this.ticketCount }, () => new Lotto({
      type: 'ticket',
      numbers: createLottoNumbers()
    }))
  }
}