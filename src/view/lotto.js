import { readLineAsync } from "../util/io-util.js";

const PURCHASE_AMOUNT_INPUNT = "구입금액을 입력해 주세요. ";
const COUNT_INPUT = "개를 구매했습니다.";
const WIN_NUMBERS__INPUT = "당첨 번호를 입력해 주세요. ";
const BONUS_NUMBER_INPUT = "보너스 번호를 입력해 주세요.";

export function LottoView() {
  async function purchaseInput() {
    const money = await readLineAsync(PURCHASE_AMOUNT_INPUNT).then(Number);
    return money;
  }

  async function winNumberInput() {
    const winNumberList = await readLineAsync(WIN_NUMBERS__INPUT).then(
      (input) => input.split(",").map(Number)
    );
    return winNumberList;
  }

  async function bonusNumberInput() {
    const bonusNumber = await readLineAsync(BONUS_NUMBER_INPUT).then(Number);
    return bonusNumber;
  }

  function lottoCountConsole(count) {
    console.log(`${count}${COUNT_INPUT}`);
  }

  function lottoListConsole(lottoList) {
    lottoList.forEach((lottoItem) => console.log(lottoItem));
  }

  function lottoResultConsole(winRuleSchema, lottoResult) {
    console.log("당첨 통계\n--------------------");

    Object.entries(winRuleSchema)
      .sort((a, b) => b[0] - a[0])
      .forEach(([key, value]) => {
        if (value.match.bonus) {
          console.log(
            `${value.match.count}개 일치, 보너스 볼 일치 (${value.amount}원) - ${lottoResult[key]}개`
          );
        } else {
          console.log(
            `${value.match.count}개 일치 (${value.amount}원) - ${lottoResult[key]}개`
          );
        }
      });
  }

  function rateOfReturnConole(rateOfReturn) {
    console.log(`총 수익률은 ${rateOfReturn}%입니다.`);
  }

  return {
    purchaseInput,
    winNumberInput,
    bonusNumberInput,
    lottoCountConsole,
    lottoListConsole,
    lottoResultConsole,
    rateOfReturnConole,
  };
}
