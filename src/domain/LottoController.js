import createValidator from '../utils/createValidator.js';
import InputValidator from '../validator/View/InputValidator.js';
import LottoValidation from '../validator/domain/LottoValidator.js';
import LottoRule from './LottoRule.js';

export default class LottoController {
  constructor({ view, lotto, winLotto }) {
    this.view = new view();
    this.lotto = lotto;
    this.winLotto = winLotto;
  }

  async run() {
    while (true) {
      const lottos = await this.getLottos();

      this.view.printPurchaseQuantity(lottos.length);
      this.view.printLottos(lottos.map((lotto) => lotto.get()));

      const winLotto = await this.getwinLotto();
      const { prize, purchases, details, prizes } =
        winLotto.getWinningResult(lottos);

      this.view.printwinningResult({ ...details, prizes });
      this.view.printRevenue(prize / purchases);

      const restart = await this.restart();

      if (restart === 'n' || restart === 'N') {
        break;
      }
    }
  }

  async getLottos() {
    const validator = createValidator(LottoValidation);
    const money = await this.view.inputMoney({
      postProcessFn: (value) => Number(value),
      validate: (value) => validator({ money: value }),
    });
    const quantity = LottoRule.exchange(money);

    return [...new Array(quantity)].map(
      () => new this.lotto(LottoRule.generateLottoNumbers()),
    );
  }

  async getwinLotto() {
    const validator = createValidator(LottoValidation);
    const winLotto = await this.view.inputWinLotto({
      postProcessFn: (value) =>
        value.split(',').map((number) => Number(number)),
      validate: (value) => validator({ common: value, defaultLotto: value }),
    });
    const bonusNumber = await this.view.inputBonusNumber({
      postProcessFn: (value) => Number(value),
      validate: (value) =>
        validator({ number: value, common: [...winLotto, value] }),
    });

    return new this.winLotto([...winLotto, bonusNumber]);
  }

  async getRestart() {
    const validator = createValidator(InputValidator);
    const restart = await this.view.inputRestart({
      postProcessFn: (value) => value.trim(),
      validate: (value) => validator({ restart: value }),
    });

    return restart;
  }
}
