const LottoValidator = {
  lotto: {
    checkNaN: (value) =>
      value.every((number) => !isNaN(number)) ||
      '숫자로 변환할 수 없는 문자가 포함되어 있습니다.',
    checkDuplicate: (value) => {
      const set = new Set(value);

      return set.size === value.length || '중복되는 숫자가 포함되어 있습니다.';
    },
    checkLength: (value) =>
      value.length === 6 || '로또번호의 개수는 6개여야 합니다.',
    checkNumberRange: (value) =>
      value.every((number) => 1 <= number && number <= 45) ||
      '로또번호의 각 번호는 1~45 사이여야 합니다.',
  },
};

export default LottoValidator;
