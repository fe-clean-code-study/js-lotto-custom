import {validateLottoMatcher} from "../validations/lottoMatcher.js";

export default class LottoMatcher{
  static matchLotto({ winningLotto, lottoTickets }) {
    LottoMatcher.#validate({ winningLotto, lottoTickets })

    return lottoTickets.map(lottoTicket => ({
      lotto: lottoTicket,
      matchCount: LottoMatcher.#getMatchCount(lottoTicket.numbers, winningLotto),
      bonusMatch: LottoMatcher.#getBonusMatch(lottoTicket.numbers, winningLotto)
    }))
  }

  static #validate(lottoMatcherProps) {
    validateLottoMatcher({
      target: lottoMatcherProps
    })
  }

  static #getMatchCount(ticketNumbers, winningLotto) {
    return ticketNumbers.filter(ticketNumber => winningLotto.numbers.includes(ticketNumber)).length
  }

  static #getBonusMatch(ticketNumbers, winningLotto) {
    return ticketNumbers.includes(winningLotto.bonusNumber)
  }
}