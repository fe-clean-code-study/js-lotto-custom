export const range = (start, end) => {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const length = end - start;
  const result = Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = start + i;
  }

  return result;
};

export const shuffle = (array) => {
  const result = [...array];

  result.sort(() => 0.5 - Math.random());

  return result;
};
