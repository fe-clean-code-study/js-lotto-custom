import { inputManager, outputManager } from "./service/index.js";
import { LottoCalculator, LottoMachine, WinningLotto } from "./domain/index.js";

async function main() {
  const { price, count, lottos } = await inputManager.retryScan(
    "> 구입 금액을 입력해 주세요. ",
    (inputValue) => {
      const numValue = Number(inputValue);

      return new LottoMachine(numValue);
    }
  );

  outputManager.print(`${count}개 구매했습니다.`);
  outputManager.printAll(lottos, (lottos) => lottos.numbers);

  const winningNumbers = await inputManager.retryScan(
    "> 당첨 번호를 입력해 주세요. ",
    (inputValue) => {
      const numbers = inputValue
        .split(",")
        .map((value) => Number(value.trim()));

      return numbers;
    }
  );
  outputManager.linebreak();

  const bonusNumber = await inputManager.retryScan(
    "> 보너스 번호를 입력해 주세요. ",
    (inputValue) => Number(inputValue)
  );
  outputManager.linebreak();

  const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  const { winningCounts, rateOfReturn } = new LottoCalculator({
    price,
    lottos,
    winningLotto,
  });

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
}

main();
