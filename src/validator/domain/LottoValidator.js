import LottoRule from '../../domain/LottoRule.js';

const LottoValidator = {
  money: {
    checkType: (value) =>
      isNaN(value) === false ||
      '입력으로 받은 금액은 숫자로 변환가능해야 합니다.',
    checkRange: (value) =>
      LottoRule.lottoPrice <= value ||
      value <= LottoRule.limitPrice ||
      `구매 금액은 ${LottoRule.lottoPrice} 원 이상, ${LottoRule.limitPrice} 원 이하만 가능합니다.`,
  },
  number: {
    checkNumberRange: (value) =>
      (LottoRule.minNumber <= value && value <= LottoRule.maxNumber) ||
      `로또 번호는 ${LottoRule.minNumber}~${LottoRule.maxNumber}사이의 숫자여야 합니다.`,
  },
  lotto: {
    checkType: (value) =>
      value.every((number) => !isNaN(number)) ||
      '숫자로 변환할 수 없는 문자가 포함되어 있습니다.',
    checkDuplicate: (value) => {
      const set = new Set(value);

      return set.size === value.length || '중복되는 숫자가 포함되어 있습니다.';
    },
    checkNumberRange: (value) =>
      value.every((number) =>
        Object.values(LottoValidator.number).every(
          (validate) => validate(number) === true,
        ),
      ) ||
      `로또번호의 각 번호는 ${LottoRule.minNumber}~${LottoRule.maxNumber} 사이여야 합니다.`,
    checkLength: (value) =>
      value.length === LottoRule.length ||
      `로또번호의 개수는 ${LottoRule.length}개여야 합니다.`,
  },
};

export default LottoValidator;
