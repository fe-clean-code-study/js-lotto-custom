const createValidator = (validation) => {
  const validateKeyValue = (keyType, value) => {
    Object.keys(validation[keyType]).forEach((validationKey) => {
      const validate = validation[keyType][validationKey](value);

      if (validate !== true) {
        throw new Error(validate);
      }
    });
  };

  return (values) => {
    Object.entries(values).map(([keyType, value]) => {
      if (validation[keyType] === undefined) {
        throw new Error(
          `${keyType} 가 초기화 시 전달한 validation 내부에 존재하지 않습니다.`,
        );
      }

      validateKeyValue(keyType, value);
    });
  };
};

export default createValidator;
