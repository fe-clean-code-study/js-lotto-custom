import { createWinningLotto } from './Lotto.js';
import LottoPayment from './LottoPayment.js';
import LOTTO_RANKING_RULE from '../constants/lottoRankingRule.js';
import { validateLottoSystem } from '../validations/lottoSystem.js';
import cloneDeep from '../utils/cloneDeep.js';

export default class LottoSystem {
  #rankingRule;
  #lottoData;

  constructor({ rankingRule = LOTTO_RANKING_RULE } = {}) {
    LottoSystem.#validate({ rankingRule });

    this.#rankingRule = rankingRule.sort((a, b) => b.rank - a.rank);
    this.#lottoData = {
      winningLotto: null,
      lottoTickets: [],
      paidAmount: 0,
    };
  }

  static #validate(lottoSystemProps) {
    validateLottoSystem({
      target: lottoSystemProps,
    });
  }

  #setLottoData(newData) {
    this.#lottoData = { ...this.#lottoData, ...newData };
  }

  getRank(lottoTicket) {
    const matchedRuleWithBonus = this.#rankingRule
      .filter(({ bonusMatch }) => bonusMatch !== undefined)
      .find(
        ({ matchCount, bonusMatch }) =>
          lottoTicket.contain(this.winningLotto.bonusNumber) === bonusMatch &&
          lottoTicket.matchNumbers(this.winningLotto).length === matchCount,
      );
    const matchedRuleWithoutBonus = this.#rankingRule
      .filter(({ bonusMatch }) => bonusMatch === undefined)
      .find(({ matchCount }) => lottoTicket.matchNumbers(this.winningLotto).length === matchCount);

    if (matchedRuleWithBonus) return matchedRuleWithBonus.rank;
    return matchedRuleWithoutBonus?.rank;
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

  get lottoRankingResult() {
    return this.#rankingRule.map((rule) => ({
      ...rule,
      ticketList: this.lottoTickets.filter((lottoTicket) => this.getRank(lottoTicket) === rule.rank),
    }));
  }

  get profitAmount() {
    return this.lottoRankingResult.reduce((sum, { ticketList, profit }) => sum + profit * ticketList.length, 0);
  }

  get profitRatio() {
    return parseFloat(((this.profitAmount / this.paidAmount) * 100).toFixed(2));
  }
}
