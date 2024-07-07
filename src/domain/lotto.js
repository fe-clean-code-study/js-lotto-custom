import { makeLotto } from "./temp.js";

export default function Lotto(winRuleSchema) {
  function makeLottoList(count) {
    const lottoList = [];

    for (let i = 0; i < count; i++) {
      const lotto = makeLotto();

      lottoList.push(lotto);
    }

    return lottoList;
  }

  function makeLottoCount(money, lottoPrice = 1000) {
    return Math.floor(money / lottoPrice);
  }

  function makeCheckSchema(winNumberList, bonusNumber) {
    const checkSchema = { winSchema: {}, bonusSchema: bonusNumber };

    winNumberList.forEach((winNumberItem) => {
      checkSchema["winSchema"][winNumberItem] = true;
    });

    return checkSchema;
  }

  function makeLottoResult(lottoList, checkSchema) {
    const lottoResult = Object.keys(winRuleSchema).reduce((acc, cur) => {
      acc[cur] = 0;
      return acc;
    }, {});

    lottoList.forEach((lottoItem) => {
      const temp = lottoItem.reduce(
        (acc, lottoNumber) => {
          if (checkSchema["winSchema"][lottoNumber]) {
            acc["count"] += 1;
          }

          if (checkSchema["bonusSchema"] === lottoNumber) {
            acc["bonus"] = true;
          }

          return acc;
        },
        { count: 0, bonus: false }
      );

      Object.entries(winRuleSchema).forEach(([key, value]) => {
        if (
          "bonus" in value.match &&
          value.match.count === temp.count &&
          value.match.bonus === temp.bonus
        ) {
          lottoResult[key] += 1;
        }

        if (!("bonus" in value.match) && value.match.count === temp.count) {
          lottoResult[key] += 1;
        }
      });
    });

    return lottoResult;
  }

  function makeWinAmount(lottoResult) {
    const winAmount = Object.entries(lottoResult)
      .filter(([_, value]) => value)
      .reduce(
        (acc, [key, value]) => acc + winRuleSchema[key].amount * value,
        0
      );

    return winAmount;
  }

  function makeRateOfReturn(winAmount, money) {
    return (winAmount / money) * 100;
  }

  return {
    makeLottoList,
    makeLottoCount,
    makeCheckSchema,
    makeLottoResult,
    makeWinAmount,
    makeRateOfReturn,
  };
}
