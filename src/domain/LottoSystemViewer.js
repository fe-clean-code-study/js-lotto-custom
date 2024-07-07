import ConsolePrinter from "../service/ConsolePrinter.js";
import ConsoleReader from "../service/ConsoleReader.js";

export default class LottoSystemViewer{
  constructor() {
    this.printer = new ConsolePrinter({
      lottoTicket: '%{1} | %{2} | %{3} | %{4} | %{5} | %{6}',
      startShowResult: '\n당첨 통계\n---------------------------------------------',
      ranking: '%{1}등 : %{2}개 일치 (%{3}원) - %{4}개',
      rankingWithBonus: '%{1}등 : %{2}개 일치, 보너스볼 일치 (%{3}원) - %{4}개',
      profitRatio: '총 수익률은 %{1}% 입니다.'
    })
    this.reader = new ConsoleReader()
  }

  async readPayAmount() {
    const answer = await this.reader.read('> 구입 금액을 입력해 주세요. : ')
    return Number(answer)
  }

  async readWinningNumbers() {
    const answer = await this.reader.read('> 당첨 번호를 입력해 주세요. : ')
    return answer.split(',').map(Number)
  }

  async readBonusNumber() {
    const answer = await this.reader.read('> 보너스 번호를 입력해 주세요. : ')
    return Number(answer)
  }

  displayLottoTickets({ lottoData }) {
    lottoData.lottoTickets.forEach(({ numbers }) => {
      const numbersForPrint = numbers.map(number => `${number}`.padStart(2, '0'))
      this.printer.printWithTemplate('lottoTicket', numbersForPrint)
    })
  }

  displayLottoResult({ lottoRankingResult, profitRatio }) {
    this.printer.printWithTemplate('startShowResult')
    lottoRankingResult.forEach(({ rank, matchCount, bonusMatch, profit, ticketList }) => {
      const resultForPrint = [rank, matchCount, profit, ticketList.length]
      if (bonusMatch) {
        this.printer.printWithTemplate('rankingWithBonus', resultForPrint)
      }
      else {
        this.printer.printWithTemplate('ranking', resultForPrint)
      }
    })
    this.printer.printWithTemplate('profitRatio', [profitRatio])
  }
}
