import { validateLottoRuleSet } from '../validations/lottoRuleSet.js';
import cloneDeep from '../utils/cloneDeep.js';

export default class LottoRuleSet {
  #ruleSet;
  constructor({ initialRule }) {
    LottoRuleSet.#validate({ initialRule });
    this.#ruleSet = initialRule.sort((a, b) => b.rank - a.rank);
  }

  get rulesWithBonusMatch() {
    return this.#ruleSet.filter(({ bonusMatch }) => bonusMatch !== undefined);
  }

  get rulesWithoutBonusMatch() {
    return this.#ruleSet.filter(({ bonusMatch }) => bonusMatch === undefined);
  }

  get rules() {
    return cloneDeep(this.#ruleSet);
  }

  increaseRankProfit(leftAmount) {
    this.#ruleSet = this.#ruleSet.map(({ profit, distribute, ...rule }) => ({
      ...rule,
      profit: distribute ? profit + Math.floor(leftAmount * distribute) : profit,
    }));
  }

  static #validate(lottoRuleSetProps) {
    validateLottoRuleSet({
      target: lottoRuleSetProps,
    });
  }
}
