const retryOnFailureAsync = async (asyncFn, errorFn) => {
  try {
    return await asyncFn();
  } catch (error) {
    errorFn(error);

    return await retryOnFailureAsync(asyncFn, errorFn);
  }
};

export default retryOnFailureAsync;
