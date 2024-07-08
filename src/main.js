import LottoSystemControl from './domain/LottoSystemControl.js';
import LottoSystem from './domain/LottoSystem.js';
import LOTTO_RANKING_RULE from './constants/lottoRankingRule.js';
import LottoSystemView from './domain/LottoSystemView.js';

async function main() {
  const lottoSystemControl = new LottoSystemControl({
    lottoSystem: new LottoSystem({
      rankingRule: LOTTO_RANKING_RULE
    }),
    viewer: new LottoSystemView()
  });

  await lottoSystemControl.run();
}

main();
