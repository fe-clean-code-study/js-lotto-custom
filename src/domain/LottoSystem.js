import { createWinningLotto } from "./Lotto.js";
import LottoPayment from "./LottoPayment.js";
import LottoMatcher from "./LottoMatcher.js";
import LOTTO_RANKING_DATA from "../constants/lottoRankingData.js";
import {validateLottoSystem} from "../validations/lottoSystem.js";

export default class LottoSystem {
  constructor({ rankingData = LOTTO_RANKING_DATA } = {}) {
    LottoSystem.#validate({ rankingData })

    this.rankingData = rankingData;
    this.lottoData = {
      winningLotto: null,
      lottoTickets: []
    };
    this.payAmount = 0
  }

  static #validate(lottoSystemProps) {
    validateLottoSystem({
      target: lottoSystemProps
    })
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.lottoData.winningLotto = createWinningLotto(winningNumbers, bonusNumber);
  }

  payLottoTicket(payAmount) {
    this.lottoData.lottoTickets = LottoPayment.createLottoTickets({ payAmount });
    this.payAmount = payAmount
  }

  get ticketCount() {
    return this.lottoData.lottoTickets.length
  }

  get lottoRankingResult() {
    const lottoMatchResult = LottoMatcher.matchLotto(this.lottoData);
    return this.rankingData.map((data) => ({
      ...data,
      ticketList : lottoMatchResult
        .filter(({ matchCount, bonusMatch }) => matchCount === data.matchCount && bonusMatch === data.bonusMatch)
        .map(({ lotto }) => lotto)
    }))
  }

  get profitAmount() {
    return this.lottoRankingResult.reduce((sum, { ticketList, profit }) => sum + profit * ticketList.length, 0);
  }

  get profitRatio() {
    return parseFloat((this.profitAmount / this.payAmount * 100).toFixed(2));
  }
}
