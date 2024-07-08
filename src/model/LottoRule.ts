import { LOTTO_TYPE, LottoType } from '../constants/lottoType.js';
import { isNumberInRange } from '../util/isNumberInRange.js';

export class LottoRule {
  public readonly price: number;
  public readonly lottoType: LottoType;

  constructor(price: number, type: string) {
    if (!isNumberInRange({ number: price, minRange: 0 })) {
      throw new Error('로또 가격은 0보다 커야 합니다.');
    }
    if (!LOTTO_TYPE[type]) {
      throw new Error('로또 타입이 올바르지 않습니다.');
    }

    this.price = price;
    this.lottoType = LOTTO_TYPE[type];
  }
}
