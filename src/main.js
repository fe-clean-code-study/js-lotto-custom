import { inputManager, outputManager } from "./service/index.js";
import { LottoMachine } from "./domain/index.js";

async function main() {
  const lottoMachine = await inputManager.retryScan(
    "> 구입 금액을 입력해 주세요. ",
    (inputValue) => {
      const numValue = Number(inputValue);

      return new LottoMachine(numValue);
    }
  );

  outputManager.print(`${lottoMachine.count}개 구매했습니다.`);
  outputManager.printAll(lottoMachine.lottos, (lottos) => lottos.numbers);
}

main();
