const InputValidator = {
  message: {
    checkType: (value) =>
      typeof value === 'string' || 'message 는 문자열 타입이어야 합니다.',
    checkLength: (value) =>
      value.trim().length >= 1 || 'message 는 1글자 이상이어야 합니다',
  },
  options: {
    checkType: (value) =>
      typeof value === 'object' || 'options 는 객체 타입이어야 합니다.',
    checkHasPostProcessFn: (value) =>
      'postProcessFn' in value ||
      'options 는 postProcessFn 프로퍼티를 가지고 있어야 합니다.',
    checkHasValidate: (value) =>
      'validate' in value ||
      'options 는 validation 프로퍼티를 가지고 있어야 합니다.',
  },
  postProcessFn: {
    checkType: (value) =>
      value === undefined ||
      typeof value === 'function' ||
      'postProcessFn 는 함수여야 합니다.',
  },
  validate: {
    checkType: (value) =>
      value === undefined ||
      typeof value === 'function' ||
      'validate 는 함수여야 합니다.',
  },
  restart: {
    checkValue: (value) =>
      value === 'y' ||
      value === 'Y' ||
      value === 'n' ||
      value === 'N' ||
      '재시작 여부는 영문자 y 혹은 n 의 값이어야 합니다.',
  },
};

export default InputValidator;
