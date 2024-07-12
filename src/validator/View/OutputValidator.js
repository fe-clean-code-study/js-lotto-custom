const OutputValidator = {
  templateKey: {
    templateKeyType: (value) =>
      typeof value === 'string' || 'templateKey 의 타입이 문자열이 아닙니다.',
  },
  templateVariables: {
    templateVariablesType: (value) =>
      typeof value === 'object' ||
      'templateVariables 의 타입이 객체가 아닙니다.',
  },
};

export default OutputValidator;
