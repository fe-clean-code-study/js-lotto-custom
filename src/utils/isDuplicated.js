function isDuplicated(array) {
  const set = new Set(array);

  return set.size !== array.length;
}

export default isDuplicated;
