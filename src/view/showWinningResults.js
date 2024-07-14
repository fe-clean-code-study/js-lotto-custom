import { LOTTO_RANKING_INFO } from "../constants/index.js";
import { outputManager } from "../service/index.js";
import { formatKoreanCurrency } from "../utils/index.js";

const showWinningResults = (winningCounts, rateOfReturn) => {
  outputManager.print("당첨 통계");
  outputManager.print("--------------------");

  LOTTO_RANKING_INFO.reverse().forEach(
    ({ ranking, matchingCount, isBonusMatch, prizeMoney }) => {
      const bonusMatchMessage = isBonusMatch ? `, 보너스 볼 일치` : "";
      const formattedPrizeMoney = formatKoreanCurrency(prizeMoney);

      outputManager.print(
        `${matchingCount}개 일치${bonusMatchMessage} (${formattedPrizeMoney}원) - ${winningCounts[ranking]}개`
      );
    }
  );

  outputManager.print(`총 수익률은 ${rateOfReturn}%입니다.`);
};

export default showWinningResults;
