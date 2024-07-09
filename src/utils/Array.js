import { generateRandomNumber } from './Number.js';

export function accord(base, compare) {
  const baseSet = new Set(base);

  return compare.reduce(
    (prev, curr) => (baseSet.has(curr) ? prev + 1 : prev),
    0,
  );
}

export function generateRandomNumberArray(amount, min, max) {
  const set = new Set();

  while (set.size < amount) {
    set.add(generateRandomNumber(min, max));
  }

  return [...set].sort((a, b) => a - b);
}
