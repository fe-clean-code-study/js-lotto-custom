import { validateLottoPayment } from '../validations/lottoPayment.js';
import createLottoNumbers from './createLottoNumbers.js';
import { createLottoTicket } from './Lotto.js';

export default class LottoPayment {
  static createLottoTickets({ payAmount }) {
    LottoPayment.#validate({ payAmount });

    const ticketCount = Math.floor(payAmount / 1000);
    return {
      lottoTickets: Array.from({ length: ticketCount }, () => {
        const numbers = createLottoNumbers();
        return createLottoTicket(numbers);
      }),
      paidAmount: payAmount,
    };
  }

  static #validate(lottoPaymentProps) {
    validateLottoPayment({
      target: lottoPaymentProps,
    });
  }
}
