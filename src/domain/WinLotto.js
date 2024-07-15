import Lotto from './Lotto.js';
import LottoValidator from '../validator/domain/LottoValidator.js';
import createValidator from '../utils/createValidator.js';
import LottoRule from './LottoRule.js';

export default class WinLotto extends Lotto {
  constructor(...lotto) {
    super(...lotto);
  }

  set(...lotto) {
    const validator = createValidator(LottoValidator);
    const normalizedLotto = Lotto.normalize(...lotto);

    validator({ common: normalizedLotto, winLotto: normalizedLotto });
    this.lotto = normalizedLotto;
  }

  isBonusCorrect(lotto) {
    const bonusNumber = this.lotto.at(-1);

    return lotto.includes(bonusNumber);
  }

  getRank(lotto) {
    const bonusCorrect = this.isBonusCorrect(lotto);
    const accordCount = this.accord(lotto) - bonusCorrect ? 1 : 0;

    for (const rank of LottoRule.winningInfo) {
      if (accordCount === LottoRule.winningInfo[rank].accord) {
        if (LottoRule.winningInfo[rank].checkBonus && bonusCorrect) {
          return rank;
        }

        return rank;
      }
    }
  }

  getWinningResult(lottos) {
    const winningResult = {
      prize: 0,
      purchases: lottos.length * LottoRule.lottoPrice,
      details: {},
      prizes: {},
    };

    Object.entries(LottoRule.moneyByRank).forEach(([rank, money]) => {
      winningResult.details[rank] = 0;
      winningResult.prizes[rank + 'Money'] = money;
    });
    lottos.forEach((lotto) => {
      const rank = this.getRank(lotto.get());

      winningResult.details[rank] += 1;
      winningResult.prize += LottoRule.moneyByRank[rank];
    });

    return winningResult;
  }
}
