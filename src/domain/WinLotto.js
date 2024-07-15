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
    const accordCount = this.accord(lotto) - (bonusCorrect ? 1 : 0);

    for (const rank in LottoRule.winningInfo) {
      if (accordCount === LottoRule.winningInfo[rank].accord) {
        if (LottoRule.winningInfo[rank].checkBonus === false) {
          return rank;
        }
        if (LottoRule.winningInfo[rank].checkBonus && bonusCorrect) {
          return rank;
        }
      }
    }

    return 'none';
  }

  getWinningResult(lottos) {
    const winningResult = {
      prize: 0,
      purchases: lottos.length * LottoRule.lottoPrice,
      details: {},
      prizes: {},
    };
    lottos = lottos.map((lotto) =>
      Array.isArray(lotto) ? lotto : lotto.get(),
    );

    Object.entries(LottoRule.winningInfo).forEach(([rank, rankInfo]) => {
      winningResult.details[rank] = 0;
      winningResult.prizes[rank + 'Money'] = rankInfo.prize;
    });
    lottos.forEach((lotto) => {
      const rank = this.getRank(lotto);

      winningResult.details[rank] += 1;
      winningResult.prize += LottoRule.winningInfo[rank].prize;
    });

    return winningResult;
  }
}
