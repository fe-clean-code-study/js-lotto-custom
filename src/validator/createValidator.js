const createValidator = (validation) => {
  const validateKeyValue = (key, value) => {
    if (validation[key] === undefined) {
      throw new Error('해당 키 값이 validation 내부에 존재하지 않습니다.');
    }
    const validate = validation[key](value);

    if (validate !== true) {
      throw new Error(validate);
    }
  };

  return (keys, values) => {
    if (typeof keys === 'string' && typeof values === 'string') {
      validateKeyValue(keys, values);
      return;
    }
    if (Array.isArray(keys) && Array.isArray(values)) {
      if (keys.length !== values.length) {
        throw new Error('키 배열의 개수와 값 배열의 개수가 일치해야 합니다.');
      }
      keys.forEach((key, index) => validateKeyValue(key, values[index]));
      return;
    }

    throw new Error(
      '매개변수로 전달한 keys 와 values 의 타입은 동일해야 합니다.',
    );
  };
};

export default createValidator;
