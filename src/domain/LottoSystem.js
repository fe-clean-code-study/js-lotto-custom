import { createWinningLotto } from './Lotto.js';
import LottoPayment from './LottoPayment.js';
import LottoMatcher from './LottoMatcher.js';
import LOTTO_RANKING_DATA from '../constants/lottoRankingData.js';
import { validateLottoSystem } from '../validations/lottoSystem.js';
import cloneDeep from "../utils/cloneDeep.js";

export default class LottoSystem {
  #rankingData
  #lottoData
  
  constructor({ rankingData = LOTTO_RANKING_DATA } = {}) {
    LottoSystem.#validate({ rankingData });

    this.#rankingData = rankingData;
    this.#lottoData = {
      winningLotto: null,
      lottoTickets: [],
      paidAmount: 0
    };
  }

  static #validate(lottoSystemProps) {
    validateLottoSystem({
      target: lottoSystemProps,
    });
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.#setLottoData({
      winningLotto: createWinningLotto(winningNumbers, bonusNumber)
    })
  }

  payLottoTicket(payAmount) {
    const { lottoTickets, paidAmount } = LottoPayment.createLottoTickets({ payAmount })
    this.#setLottoData({
      lottoTickets,
      paidAmount
    })
  }

  #setLottoData(newData) {
    this.#lottoData = { ...this.#lottoData, ...newData };
  }

  get paidAmount() {
    return this.#lottoData.paidAmount;
  }

  get lottoTickets() {
    return cloneDeep(this.#lottoData.lottoTickets);
  }

  get ticketCount() {
    return this.#lottoData.lottoTickets.length;
  }

  get lottoRankingResult() {
    const lottoMatchResult = LottoMatcher.matchLotto(this.#lottoData);

    return this.#rankingData.map((data) => ({
      ...data,
      ticketList: lottoMatchResult
        .filter(({ matchCount, bonusMatch }) =>
          matchCount === data.matchCount
          && (data.bonusMatch === undefined || bonusMatch === data.bonusMatch))
        .map(({ lotto }) => lotto),
    }));
  }

  get profitAmount() {
    return this.lottoRankingResult.reduce((sum, { ticketList, profit }) => sum + profit * ticketList.length, 0);
  }

  get profitRatio() {
    return parseFloat(((this.profitAmount / this.paidAmount) * 100).toFixed(2));
  }
}
