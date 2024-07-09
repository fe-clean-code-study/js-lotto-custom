import View from './View/View.js';
import LottoRule from './domain/LottoRule.js';
import Lotto from './domain/Lotto.js';
import WinLotto from './domain/WinLotto.js';

async function main() {
  const view = new View();
  const money = await view.inputPurchaseLotto({
    postProcessFn: (input) => Number(input),
    errorCheckFn: (input) => LottoRule.getMoneyError(input),
  });
  const quantity = LottoRule.calculateQuantity(money);
  const lottos = [...new Array(quantity)].map(
    () => new Lotto(LottoRule.generateLottoNumber()),
  );

  view.printPurchaseLotto(quantity);
  view.printAllLotto(lottos.map((lotto) => lotto.get()));

  const winPureLotto = await view.inputWinLotto({
    postProcessFn: (input) => input.split(',').map((el) => Number(el.trim())),
    errorCheckFn: (input) => Lotto.getLottoError(input),
  });
  const bonusNumber = await view.inputBonusNumber({
    postProcessFn: (input) => Number(input),
    errorCheckFn: (input) => WinLotto.getBonusNumberError(input),
  });
  const winLotto = new WinLotto([...winPureLotto, bonusNumber]);
  const rankInfo = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  lottos.forEach((lotto) => {
    rankInfo[winLotto.checkRank(lotto.get())] += 1;
  });
  const totalMoney = Object.keys(rankInfo).reduce(
    (money, rank) => money + rankInfo[rank] * LottoRule.REWARD[rank],
    0,
  );

  view.printAccordByRank(rankInfo);
  view.printRate(totalMoney / money);
}

main();
