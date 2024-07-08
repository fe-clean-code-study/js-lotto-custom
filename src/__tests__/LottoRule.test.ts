import { LottoRule } from '../model/LottoRule.js';

describe('LottoRule', () => {
  it('가격이 0보다 작으면 에러가 발생한다.', () => {
    expect(() => new LottoRule(-1000, '1')).toThrowError();
  });

  it('로또 타입이 올바르지 않으면 에러가 발생한다.', () => {
    expect(() => new LottoRule(1000, 'INVALID_TYPE')).toThrowError();
  });
});
