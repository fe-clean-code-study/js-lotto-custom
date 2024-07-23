export const throwErrorWithCondition = (condition, errorMessage) => {
  if (condition) {
    throw new Error(errorMessage);
  }
};

export const validate = {
  type(value, typeValue, errorMessage) {
    throwErrorWithCondition(typeof value !== typeValue, errorMessage);
  },
  integer(value, errorMessage) {
    throwErrorWithCondition(!Number.isInteger(value), errorMessage);
  },
  array(value, errorMessage) {
    throwErrorWithCondition(!Array.isArray(value), errorMessage);
  },
};
