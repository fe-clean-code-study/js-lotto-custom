import { isValidInteger } from '../util/isValidInteger.js';

describe('isValidInteger', () => {
  it('정수인 경우 true 반환', () => {
    expect(isValidInteger(42)).toBe(true);
    expect(isValidInteger(0)).toBe(true);
    expect(isValidInteger(-10)).toBe(true);
  });

  it('정수가 아닌 경우 false 반환', () => {
    expect(isValidInteger(3.14)).toBe(false);
    expect(isValidInteger(-4.5)).toBe(false);
    expect(isValidInteger(NaN)).toBe(false);
  });
});
