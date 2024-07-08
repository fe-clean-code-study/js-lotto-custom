import { createWinningLotto } from './Lotto.js';
import LottoPayment from './LottoPayment.js';
import LottoMatcher from './LottoMatcher.js';
import LOTTO_RANKING_RULE from '../constants/lottoRankingRule.js';
import { validateLottoSystem } from '../validations/lottoSystem.js';
import cloneDeep from "../utils/cloneDeep.js";

export default class LottoSystem {
  #rankingRule
  #lottoData
  
  constructor({ rankingRule = LOTTO_RANKING_RULE } = {}) {
    LottoSystem.#validate({ rankingRule });

    this.#rankingRule = rankingRule.sort((a, b) => b.rank - a.rank);
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

    return this.#rankingRule.map((rule) => ({
      ...rule,
      ticketList: lottoMatchResult
        .filter(({ matchCount, bonusMatch }) =>
          this.#isSameMatchCount(matchCount, rule.matchCount)
          && this.#isSameBonusMatch(bonusMatch, rule.bonusMatch))
        .map(({ lotto }) => cloneDeep(lotto)),
    }));
  }

  get profitAmount() {
    return this.lottoRankingResult.reduce((sum, { ticketList, profit }) => sum + profit * ticketList.length, 0);
  }

  get profitRatio() {
    return parseFloat(((this.profitAmount / this.paidAmount) * 100).toFixed(2));
  }

  #isSameMatchCount(ticketMatchCount, ruleMatchCount) {
    return ticketMatchCount === ruleMatchCount;
  }

  #isSameBonusMatch(ticketBonusMatch, ruleBonusMatch) {
    return ruleBonusMatch === undefined || ruleBonusMatch === ticketBonusMatch;
  }
}
