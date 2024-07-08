import { getRandomNumber } from '../util/getRandomNumber.js';

describe('getRandomNumber', () => {
  it('지정된 최소값과 최대값 사이의 랜덤 숫자를 반환한다.', () => {
    const min = 1;
    const max = 10;
    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it('최소값과 최대값이 동일할 때 최소값을 반환한다.', () => {
    const min = 5;
    const max = 5;
    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBe(min);
  });

  it('최소값이 최대값보다 클 때 값을 교환하여 랜덤 값을 반환한다.', () => {
    const min = 4;
    const max = 1;
    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(max);
    expect(randomNumber).toBeLessThanOrEqual(min);
  });
});
