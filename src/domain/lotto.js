export default function Lotto(winRuleSchema) {
  function makeLottoCount(money, lottoPrice = 1000) {
    return Math.floor(money / lottoPrice);
  }

  function makeLottoList(count, makeLotto) {
    const lottoList = [];

    for (let i = 0; i < count; i++) {
      const lotto = makeLotto();

      lottoList.push(lotto);
    }

    return lottoList;
  }

  function makeCheckSchema(winNumberList, bonusNumber) {
    if (winNumberList.includes(bonusNumber)) {
      throw new Error("잘못된 입력입니다.");
    }

    const checkSchema = { winSchema: {}, bonusSchema: bonusNumber };

    winNumberList.forEach((winNumberItem) => {
      checkSchema["winSchema"][winNumberItem] = true;
    });

    return checkSchema;
  }

  function makeLottoResult(lottoList, checkSchema) {
    const lottoDefault = generateLottoDefault(winRuleSchema);

    const lottoResult = lottoList.reduce((lottoAccumulator, lottoItem) => {
      const checkedResult = generateCheckedResult(lottoItem, checkSchema);

      Object.entries(winRuleSchema).forEach((rule) =>
        changeLottoAccumulatorRank(lottoAccumulator, rule, checkedResult)
      );

      return lottoAccumulator;
    }, lottoDefault);

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
    get totalAmount() {
      return Object.values(winRuleSchema).reduce(
        (acc, cur) => acc + cur.amount,
        0
      );
    },
    makeLottoList,
    makeLottoCount,
    makeCheckSchema,
    makeLottoResult,
    makeWinAmount,
    makeRateOfReturn,
  };
}

function generateLottoDefault(winRuleSchema) {
  const lottoDefault = Object.keys(winRuleSchema).reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {});

  return lottoDefault;
}

function generateCheckedResult(lotto, checkSchema) {
  const checkedResult = lotto.reduce(
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

  return checkedResult;
}

function changeLottoAccumulatorRank(lottoAccumulator, rule, checkedResult) {
  const [rank, condition] = rule;

  if (isSameBonusAndCount(condition.match, checkedResult)) {
    lottoAccumulator[rank] += 1;
  }

  if (isSameOnlyCount(condition.match, checkedResult)) {
    lottoAccumulator[rank] += 1;
  }
}

function isExistBonus(match) {
  return "bonus" in match;
}

function isSameBonusAndCount(match, checkedResult) {
  return (
    isExistBonus(match) &&
    match.count === checkedResult.count &&
    match.bonus === checkedResult.bonus
  );
}

function isSameOnlyCount(match, checkedResult) {
  return !isExistBonus(match) && match.count === checkedResult.count;
}
