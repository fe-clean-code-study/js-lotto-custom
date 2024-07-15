import Input from './Input.js';
import Output from './Output.js';

export default class View {
  constructor() {
    this.input = new Input();
    this.output = new Output({
      template: {
        printPurchaseQuantity: `%{quantity}개를 구매했습니다.`,
        printLotto: `[%{lotto}]`,
        printWinningResult: `
        당첨 통계\n
        ----------------------\n
        3개 일치 (%{fifthMoney}원) - %{fifth}개
        4개 일치 (%{fourthMoney}원) - %{fourth}개
        5개 일치 (%{thirdMoney}원) - %{third}개
        5개 일치, 보너스 볼 일치 (%{secondMoney}원) - %{second}개
        6개 일치 (%{firstMoney}원) - %{first}개\n
        `,
        printRevenue: `총 수익률은 %{revenue}%입니다.`,
      },
    });
  }

  async inputMoney(options) {
    return this.input.readInput('> 구매 금액을 입력해주세요. : ', options);
  }

  async inputWinLotto(options) {
    return this.input.readInput('> 당첨 번호를 입력해주세요. : ', options);
  }

  async inputBonusNumber(options) {
    return this.input.readInput('> 보너스 번호를 입력해주세요. : ', options);
  }

  async inputRestart(options) {
    return this.input.readInput(
      '> 로또를 다시 구매하시겠습니까? (예: y, 아니오: n) : ',
      options,
    );
  }

  printPurchaseQuantity(quantity) {
    Output.print(this.output.format('printPurchaseQuantity', { quantity }));
  }

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Output.print(this.output.format('printLotto', { lotto }));
    });
    Output.lineBreak();
  }

  printWinningResult(lottoResult) {
    Output.print(this.output.format('printWinningResult', lottoResult));
  }

  printRevenue(revenue) {
    Output.print(this.output.format('printRevenue', { revenue }));
  }
}
