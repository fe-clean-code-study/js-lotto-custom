import { createWinningLotto } from './Lotto.js';
import LottoPayment from './LottoPayment.js';
import LOTTO_RANKING_RULE from '../constants/lottoRankingRule.js';
import cloneDeep from '../utils/cloneDeep.js';
import LottoRuleSet from './LottoRuleSet.js';

export default class LottoSystem {
  #ruleSet;
  #lottoData;

  constructor({ rankingRule = LOTTO_RANKING_RULE } = {}) {
    this.#lottoData = {
      winningLotto: null,
      lottoTickets: [],
      paidAmount: 0,
    };
    this.#ruleSet = new LottoRuleSet({ initialRule: rankingRule });
  }

  #setLottoData(newData) {
    this.#lottoData = { ...this.#lottoData, ...newData };
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.#setLottoData({
      winningLotto: createWinningLotto(winningNumbers, bonusNumber),
    });
  }

  payLottoTicket(payAmount) {
    this.#setLottoData({
      lottoTickets: LottoPayment.createLottoTickets(payAmount),
      paidAmount: payAmount,
    });
  }

  getRank(lottoTicket) {
    const matchedRuleWithBonus = this.#ruleSet.rulesWithBonusMatch.find(
      ({ matchCount, bonusMatch }) =>
        lottoTicket.contain(this.winningLotto.bonusNumber) === bonusMatch &&
        lottoTicket.matchNumbers(this.winningLotto).length === matchCount,
    );
    const matchedRuleWithoutBonus = this.#ruleSet.rulesWithoutBonusMatch.find(
      ({ matchCount }) => lottoTicket.matchNumbers(this.winningLotto).length === matchCount,
    );

    if (matchedRuleWithBonus) return matchedRuleWithBonus.rank;
    return matchedRuleWithoutBonus?.rank;
  }

  getCountByRank(rank) {
    return this.lottoTickets.filter((lottoTicket) => this.getRank(lottoTicket) === rank).length;
  }

  get lottoRankingResult() {
    return this.#ruleSet.rules.map((rule) => ({
      ...rule,
      count: this.getCountByRank(rule.rank),
    }));
  }

  get profitAmount() {
    return this.lottoRankingResult.reduce((sum, { count, profit }) => sum + profit * count, 0);
  }

  get leftPaidAmount() {
    return Math.max(0, this.paidAmount - this.profitAmount);
  }

  increaseProfit() {
    this.#ruleSet.increaseRankProfit(this.leftPaidAmount);
  }

  get profitRatio() {
    return parseFloat(((this.profitAmount / this.paidAmount) * 100).toFixed(2));
  }

  get paidAmount() {
    return this.#lottoData.paidAmount;
  }

  get lottoTickets() {
    return cloneDeep(this.#lottoData.lottoTickets);
  }

  get winningLotto() {
    return cloneDeep(this.#lottoData.winningLotto);
  }

  get ticketCount() {
    return this.#lottoData.lottoTickets.length;
  }
}
