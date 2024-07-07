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
    this.lottoData.lottoTickets = new LottoPayment({ payAmount }).createLottoTickets();
    this.payAmount = payAmount
  }

  get ticketCount() {
    return this.lottoData.lottoTickets.length
  }

  get lottoRankingResult() {
    const { lottoMatchResult } = new LottoMatcher(this.lottoData);

    return this.rankingData.map((data) => ({
      ...data,
      rankedList: lottoMatchResult
        .filter(({ matchCount, bonusMatch }) => matchCount === data.matchCount && bonusMatch === data.bonusMatch)
        .map(({ lotto }) => lotto)
    }));
  }

  getTicketCountByRank(rank) {
    return this.lottoRankingResult.find(result => result.rank === rank).rankedList.length
  }

  get profitAmount() {
    return this.lottoRankingResult.reduce((sum, { rankedList, profit }) => sum + profit * rankedList.length, 0);
  }

  get profitRatio() {
    return parseFloat((this.profitAmount / this.payAmount * 100).toFixed(2));
  }
}
