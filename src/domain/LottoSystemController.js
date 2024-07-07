export default class LottoSystemController {
  constructor({ lottoSystem, viewer }) {
    this.lottoSystem = lottoSystem;
    this.viewer = viewer;
  }

  async setUpPayAmount() {
    try {
      const payAmount = await this.viewer.readPayAmount();
      this.lottoSystem.payLottoTicket(payAmount);
    } catch (error) {
      this.viewer.displayError(error);
      await this.setUpPayAmount();
    }
  }

  async setUpWinningLotto() {
    try {
      const winningNumbers = await this.viewer.readWinningNumbers();
      const bonusNumber = await this.viewer.readBonusNumber();
      this.lottoSystem.setWinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      this.viewer.displayError(error);
      await this.setUpWinningLotto();
    }
  }

  async run() {
    await this.setUpPayAmount();
    this.viewer.displayPaidCount(this.lottoSystem);
    this.viewer.displayLottoTickets(this.lottoSystem);

    await this.setUpWinningLotto();
    this.viewer.displayLottoResult(this.lottoSystem);
    this.viewer.displayProfitRatio(this.lottoSystem);

    this.viewer.finish();
  }
}
