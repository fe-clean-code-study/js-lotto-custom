const InputValidator = {
  message: {
    messageType: (value) =>
      typeof value === 'string' || 'message 는 문자열 타입이어야 합니다.',
    messageLength: (value) =>
      value.trim().length >= 1 || 'message 는 1글자 이상이어야 합니다',
  },
  options: {
    optionsType: (value) =>
      typeof value === 'object' || 'options 는 개체 타입이어야 합니다.',
    optionsHasPostProcessFn: (value) =>
      value.hasProperty('postProcessFn') ||
      'options 는 postProcessFn 프로퍼티를 가지고 있어야 합니다.',
    optionsHasValidation: (value) =>
      value.hasProperty('validation') ||
      'options 는 validation 프로퍼티를 가지고 있어야 합니다.',
  },
  postProcessFn: {
    PostPrcoessFnType: (value) =>
      (value !== undefined && typeof value !== 'function') ||
      'postProcessFn 는 함수여야 합니다.',
  },
  validate: {
    validateType: (value) =>
      (value !== undefined && typeof value !== 'function') ||
      'validate 는 함수여야 합니다.',
  },
};

export default InputValidator;
