import Input from './Input.js';
import Output from './Output.js';

export default class View {
  constructor() {
    this.input = new Input();
    this.output = new Output({
      template: {
        printPurchaseQuantity: `%{quantity}개를 구매했습니다.`,
        printLotto: `%{lotto}`,
        printResult: `
        당첨 통계\n
        ----------------------\n
        3개 일치 (5,000원) - %{fifth}개
        4개 일치 (50,000원) - %{fourth}개
        5개 일치 (1,500,000 원) - %{third}개
        5개 일치, 보너스 볼 일치 (30,000,000원) - %{second}개
        6개 일치 (2,000,000,000원) - %{first}개\n
        `,
        printRevenue: `총 수익률은 %{revenue}%입니다.`,
      },
    });
  }

  async inputMoney(options) {
    return this.input.readInput('> 구매 금액을 입력해주세요. : ', options);
  }

  async inputWinningLotto(options) {
    return this.input.readInput('> 당첨 번호를 입력해주세요. : ', options);
  }

  async inputBonusNumber(options) {
    return this.input.readInput('> 보너스 번호를 입력해주세요. : ', options);
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

  printResult(resultInfo) {
    Output.print(this.output.format('printResult', resultInfo));
  }

  printRevenue(revenue) {
    Output.print(this.output.format('printRevenue', { revenue }));
  }
}
