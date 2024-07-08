import { isArrayLengthValid } from '../util/isArrayLengthValid.js';

describe('isArrayLengthValid', () => {
  it('배열의 길이가 주어진 길이와 일치하면 true를 반환한다.', () => {
    const array = [1, 2, 3];
    const length = 3;
    expect(isArrayLengthValid(array, length)).toBe(true);
  });

  it('배열의 길이가 주어진 길이와 일치하지 않으면 false를 반환한다.', () => {
    const array = [1, 2, 3, 4];
    const length = 3;
    expect(isArrayLengthValid(array, length)).toBe(false);
  });
});
