import { getRandomNumber } from '../util/getRandomNumber.js';
import { hasDuplicatesInArray } from '../util/hasDuplicatesInArray.js';
import { isArrayLengthValid } from '../util/isArrayLengthValid.js';
import { isNumberInRange } from '../util/isNumberInRange.js';
import { Lotto } from './Lotto.js';
import { LottoRule } from './LottoRule.js';
import { WinningLotto } from './WinningLotto.js';

export class LottoGame {
  private tickets: Lotto[] = [];
  private _lottoRule?: LottoRule;
  private _winningLotto?: WinningLotto;

  private get lottoRule() {
    if (!this._lottoRule) throw new Error('로또 규칙이 설정되지 않았습니다.');
    return this._lottoRule;
  }

  private get winningLotto() {
    if (!this._winningLotto)
      throw new Error('당첨 번호가 설정되지 않았습니다.');
    return this._winningLotto;
  }

  public getTickets(): number[][] {
    return this.tickets.map((ticket) => ticket.numbers);
  }

  public setLottoRule(price: number, type: string) {
    this._lottoRule = new LottoRule(price, type);
  }

  public setTickets(receivedMoney: number) {
    if (receivedMoney < this.lottoRule.price) {
      throw new Error('금액이 부족합니다.');
    }

    const ticketCount = Math.floor(receivedMoney / this.lottoRule.price);
    const tickets: Lotto[] = [];

    for (let _ = 0; _ < ticketCount; _++) {
      const numbers = this.generateRandomNumbers();
      tickets.push(new Lotto(numbers));
    }

    this.tickets = tickets;
  }

  public setWinningLotto(numbers: number[], bonusNumber: number) {
    if (!this.isValidWinningLottoNumbers(numbers, bonusNumber)) {
      throw new Error('로또 번호가 유효하지 않습니다.');
    }

    this._winningLotto = new WinningLotto(numbers, bonusNumber);
  }

  public getResult() {
    const result = this.tickets.map((ticket) => {
      const { bonusNumber, numbers } = this.winningLotto;

      return ticket.matchNumbers(numbers, bonusNumber);
    });

    const formattedResult = this.getFormattedResult(result);
    const totalRewardPercent = this.getTotalRewardPercent(formattedResult);

    return {
      formattedResult,
      totalRewardPercent,
    };
  }

  private getFormattedResult(
    result: {
      matchedCount: number;
      includedBonusNumber: boolean;
    }[]
  ) {
    const { winningInfo } = this.lottoRule.lottoType;

    const formattedResults = winningInfo.map((info) => {
      const count = result.filter(
        (ticket) =>
          ticket.matchedCount === info.matchCount &&
          (info.includeBonus
            ? ticket.includedBonusNumber === info.includeBonus
            : true)
      ).length;

      return {
        reward: info.reward,
        matchCount: info.matchCount,
        includeBonus: info.includeBonus,
        count,
      };
    });

    return formattedResults;
  }

  private getTotalRewardPercent(
    formattedResult: {
      reward: number;
      matchCount: number;
      includeBonus: boolean | undefined;
      count: number;
    }[]
  ) {
    const totalReward = formattedResult.reduce(
      (acc, { reward, count }) => acc + reward * count,
      0
    );

    const totalInvestment = this.tickets.length * this.lottoRule.price;

    return ((totalInvestment / totalReward) * 100).toFixed(1);
  }

  private generateRandomNumbers(): number[] {
    const numbers = new Set<number>();
    while (numbers.size < this.lottoRule.lottoType.selectedCount) {
      const minNumber = this.lottoRule.lottoType.minNumber;
      const maxNumber = this.lottoRule.lottoType.maxNumber;

      numbers.add(getRandomNumber(minNumber, maxNumber));
    }

    return Array.from(numbers);
  }

  private isValidWinningLottoNumbers(numbers: number[], bonusNumber: number) {
    if (hasDuplicatesInArray([...numbers, bonusNumber])) return false;
    const { minNumber, maxNumber } = this.lottoRule.lottoType;

    if (
      !isNumberInRange({
        number: bonusNumber,
        minRange: minNumber,
        maxRange: maxNumber,
      })
    )
      return false;

    return this.isValidLottoNumbers(numbers);
  }

  private isValidLottoNumbers(numbers: number[]): boolean {
    const { minNumber, maxNumber, selectedCount } = this.lottoRule.lottoType;

    if (hasDuplicatesInArray(numbers)) return false;

    if (
      !numbers.every((number) =>
        isNumberInRange({ number, minRange: minNumber, maxRange: maxNumber })
      )
    )
      return false;

    if (!isArrayLengthValid(numbers, selectedCount)) return false;

    return true;
  }
}
