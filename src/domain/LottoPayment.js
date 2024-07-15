import { validateLottoPayment } from '../validations/lottoPayment.js';
import createLottoNumbers from './createLottoNumbers.js';
import Lotto, { createLottoTicket } from './Lotto.js';

export default class LottoPayment {
  static createLottoTickets(payAmount) {
    LottoPayment.#validate({ payAmount });

    const ticketCount = Math.floor(payAmount / 1000);
    return Array.from({ length: ticketCount }, () => new Lotto(createLottoNumbers()));
  }

  static #validate(lottoPaymentProps) {
    validateLottoPayment({
      target: lottoPaymentProps,
    });
  }
}
