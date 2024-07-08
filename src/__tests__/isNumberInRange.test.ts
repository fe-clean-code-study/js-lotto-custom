import { isNumberInRange } from '../util/isNumberInRange.js';

describe('isNumberInRange', () => {
  it('숫자가 최소 범위 미만인 경우 false를 반환한다.', () => {
    expect(isNumberInRange({ number: 0, minRange: 1, maxRange: 10 })).toBe(
      false
    );
  });

  it('숫자가 최대 범위 초과인 경우 false를 반환한다.', () => {
    expect(isNumberInRange({ number: 11, minRange: 1, maxRange: 10 })).toBe(
      false
    );
  });

  it('숫자가 유효한 범위 내에 있는 경우 true를 반환한다.', () => {
    expect(isNumberInRange({ number: 5, minRange: 1, maxRange: 10 })).toBe(
      true
    );
  });

  it('최대 범위가 지정되지 않은 경우에도 유효한 범위 내에 있는 경우 true를 반환한다.', () => {
    expect(isNumberInRange({ number: 5, minRange: 1 })).toBe(true);
  });
});
