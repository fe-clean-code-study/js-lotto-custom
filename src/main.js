import Lotto from "./domain/lotto.js";
import { makeLotto } from "./domain/temp.js";
import { LottoView } from "./view/lotto.js";

export const winRuleSchema = {
  1: { match: { count: 6 }, amount: 2_000_000_000 },
  2: { match: { count: 5, bonus: true }, amount: 30_000_000 },
  3: { match: { count: 5, bonus: false }, amount: 1_500_000 },
  4: { match: { count: 4 }, amount: 50_000 },
  5: { match: { count: 3 }, amount: 5_000 },
};

async function main() {
  const {
    purchaseInput,
    winNumberInput,
    bonusNumberInput,
    lottoCountConsole,
    lottoListConsole,
    lottoResultConsole,
    rateOfReturnConole,
  } = LottoView();

  const {
    makeLottoCount,
    makeLottoList,
    makeCheckSchema,
    makeLottoResult,
    makeWinAmount,
    makeRateOfReturn,
  } = Lotto(winRuleSchema);

  const money = await purchaseInput();
  const lottoCount = makeLottoCount(money);
  const lottoList = makeLottoList(lottoCount, makeLotto);

  lottoCountConsole(lottoCount);
  lottoListConsole(lottoList);

  const winNumberList = await winNumberInput();
  const bonusNumber = await bonusNumberInput();

  const checkSchema = makeCheckSchema(winNumberList, bonusNumber);
  const lottoResult = makeLottoResult(lottoList, checkSchema);

  lottoResultConsole(winRuleSchema, lottoResult);

  const winAmount = makeWinAmount(lottoResult);
  const rateOfReturn = makeRateOfReturn(winAmount, money);

  rateOfReturnConole(rateOfReturn);
}

main();
