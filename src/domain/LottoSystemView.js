import ConsolePrinter from '../service/ConsolePrinter.js';
import ConsoleReader from '../service/ConsoleReader.js';
import formatCurrency from '../utils/formatCurrency.js';

export default class LottoSystemView {
  constructor() {
    this.printer = new ConsolePrinter({
      start: '🍀 제 %{1}회 로또 복권 추첨 🍀',
      paidCount: '%{1}개를 구매했습니다.',
      lottoTicket: '%{1} | %{2} | %{3} | %{4} | %{5} | %{6}',
      line: '---------------------------------------------',
      line2: '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      ranking: '%{1}등 : %{2}개 일치 (%{3}원) - %{4}개',
      rankingWithBonus: '%{1}등 : %{2}개 일치, 보너스볼 일치 (%{3}원) - %{4}개',
      profitRatio: '총 수익률은 %{1}% 입니다.',
      error: '⚠️ %{1}',
      replay: '게임을 계속하시겠습니까? 남은 수익 %{1}원은 다음 당첨금으로 이관됩니다.',
    });
    this.reader = new ConsoleReader();
  }

  async readPayAmount() {
    const answer = await this.reader.read('> 구입 금액을 입력해 주세요. : ');
    return Number(answer);
  }

  async readWinningNumbers() {
    const answer = await this.reader.read('> 당첨 번호를 입력해 주세요. : ');
    return answer.split(',').map(Number);
  }

  async readBonusNumber() {
    const answer = await this.reader.read('> 보너스 번호를 입력해 주세요. : ');
    return Number(answer);
  }

  async readKeepGoing({ leftPaidAmount }) {
    this.printer.printWithTemplate('replay', [formatCurrency(leftPaidAmount)]);
    const answer = await this.reader.read('다시하기 = S / 그민두기 = 아무키 : ');
    return answer.toUpperCase() === 'S';
  }

  displayLottoStart(gameCount) {
    this.printer.lineBreak();
    this.printer.printWithTemplate('line2');
    this.printer.printWithTemplate('start', [gameCount]);
    this.printer.printWithTemplate('line2');
  }

  displayPaidCount({ ticketCount }) {
    this.printer.lineBreak();
    this.printer.printWithTemplate('paidCount', [ticketCount]);
  }

  displayLottoTickets({ lottoTickets }) {
    lottoTickets.forEach(({ numbers }) => {
      const numbersForPrint = numbers.map((number) => `${number}`.padStart(2, '0')).sort();
      this.printer.printWithTemplate('lottoTicket', numbersForPrint);
    });
    this.printer.lineBreak();
  }

  displayLottoResult({ lottoRankingResult }) {
    this.printer.lineBreak();
    this.printer.print('당첨 통계');
    this.printer.printWithTemplate('line');

    lottoRankingResult.forEach(({ rank, matchCount, bonusMatch, profit, count }) => {
      const resultForPrint = [rank, matchCount, formatCurrency(profit), count];
      if (bonusMatch) {
        this.printer.printWithTemplate('rankingWithBonus', resultForPrint);
      } else {
        this.printer.printWithTemplate('ranking', resultForPrint);
      }
    });
  }

  displayProfitRatio({ profitRatio }) {
    this.printer.printWithTemplate('line');
    this.printer.printWithTemplate('profitRatio', [profitRatio]);
    this.printer.lineBreak();
  }

  displayError(error) {
    this.printer.lineBreak();
    this.printer.printWithTemplate('error', [error.message]);
    this.printer.lineBreak();
  }

  finish() {
    this.reader.close();
  }
}
