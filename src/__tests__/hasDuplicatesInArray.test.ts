import { hasDuplicatesInArray } from '../util/hasDuplicatesInArray.js';

describe('hasDuplicatesInArray', () => {
  it('중복된 값이 있는 경우 true를 반환한다.', () => {
    const arrayWithDuplicates = [1, 2, 3, 4, 2];
    expect(hasDuplicatesInArray(arrayWithDuplicates)).toBe(true);
  });

  it('중복된 값이 없을 경우 false를 반환한다.', () => {
    const arrayWithNoDuplicates = [1, 2, 3, 4, 5];
    expect(hasDuplicatesInArray(arrayWithNoDuplicates)).toBe(false);
  });
});
