import { outputManager } from "../service/index.js";

const showWinningResults = (winningCounts, rateOfReturn) => {
  outputManager.print("당첨 통계");
  outputManager.print("--------------------");
  outputManager.print(`3개 일치 (5,000원) - ${winningCounts[5]}개`);
  outputManager.print(`4개 일치 (50,000원) - ${winningCounts[4]}개`);
  outputManager.print(`5개 일치 (1,500,000원) - ${winningCounts[3]}개`);
  outputManager.print(
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningCounts[2]}개`
  );
  outputManager.print(`6개 일치 (2,000,000,000원) - ${winningCounts[1]}개`);
  outputManager.print(`총 수익률은 ${rateOfReturn}%입니다.`);
};

export default showWinningResults;
