import {validateLottoMatcher} from "../validations/lottoMatcher.js";

export default class LottoMatcher{
  constructor({ winningLotto, lottoTickets }) {
    LottoMatcher.#validate({ winningLotto, lottoTickets })
    this.winningLotto = winningLotto
    this.lottoTickets = lottoTickets
  }

  get lottoMatchResult() {
    return this.lottoTickets.map(lottoTicket => ({
      lotto: lottoTicket,
      matchCount: this.#getMatchCount(lottoTicket.numbers),
      bonusMatch: this.#getBonusMatch(lottoTicket.numbers)
    }))
  }

  static #validate(lottoMatcherProps) {
    validateLottoMatcher({
      target: lottoMatcherProps
    })
  }

  #getMatchCount(ticketNumbers) {
    return ticketNumbers.filter(ticketNumber => this.winningLotto.numbers.includes(ticketNumber)).length
  }

  #getBonusMatch(ticketNumbers) {
    return ticketNumbers.includes(this.winningLotto.bonusNumber)
  }
}