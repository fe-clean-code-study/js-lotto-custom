import { LottoView } from '../View/LottoView.js';
import { LottoGame } from '../model/LottoGame.js';
import { isValidInteger } from '../util/isValidInteger.js';

export class LottoController {
  private view: LottoView;
  private lottoGame = new LottoGame();

  constructor(view: LottoView) {
    this.view = view;
  }

  public setLottoRule() {
    // TODO 로또 타입을 입력 받는 기능을 추가로 구현해야함.
    const lottoType = '1';
    const lottoPrice = 1000;

    this.lottoGame.setLottoRule(lottoPrice, lottoType);
  }

  public async purchaseTickets() {
    const receivedMoney = await this.view.getMoney();

    if (!isValidInteger(receivedMoney))
      throw new Error('금액은 정수로 입력해야 합니다.');

    this.lottoGame.setTickets(receivedMoney);
  }

  public displayTickets() {
    const tickets = this.lottoGame.getTickets();

    this.view.printMessage(`${tickets.length}개를 구매했습니다.`);
    tickets.forEach((ticket) => {
      this.view.printMessage(`[${ticket.join(', ')}]`);
    });
    this.view.printMessage('\n');
  }

  public async setWinningNumbers() {
    const { numbers, bonusNumber } = await this.getWinningLotto();
    this.lottoGame.setWinningLotto(numbers, bonusNumber);
  }

  public displayResult() {
    this.view.printMessage('당첨 통계');
    this.view.printMessage('--------------------');

    const result = this.lottoGame.getResult();

    result.formattedResult.forEach(
      ({ count, includeBonus, matchCount, reward }) => {
        this.view.printMessage(
          `${matchCount}개 일치${
            includeBonus ? ', 보너스 볼 일치' : ''
          } (${reward}원) - ${count}개`
        );
      }
    );

    this.view.printMessage(`총 수익률은 ${result.totalRewardPercent}% 입니다.`);
  }

  private async getWinningLotto() {
    const numbers = await this.view.getWinningNumbers();

    if (numbers.some((number) => !isValidInteger(number)))
      throw new Error('로또 번호는 정수로 입력해야 합니다.');

    const bonusNumber = await this.view.getWinningBonusNumber();

    if (!isValidInteger(bonusNumber))
      throw new Error('보너스 번호는 정수로 입력해야 합니다.');

    return { numbers, bonusNumber };
  }
}
