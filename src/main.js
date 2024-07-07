import LottoSystemController from "./domain/LottoSystemController.js";
import LottoSystem from "./domain/LottoSystem.js";
import LOTTO_RANKING_DATA from "./constants/lottoRankingData.js";
import LottoSystemViewer from "./domain/LottoSystemViewer.js";
async function main() {
  await new LottoSystemController({
    lottoSystem: new LottoSystem({
      rankingData: LOTTO_RANKING_DATA
    }),
    viewer: new LottoSystemViewer()
  }).run()
}

main();