import { LottoGame } from '../model/LottoGame.js';
import { getRandomNumber } from '../util/getRandomNumber.js';

describe('LottoGame 클래스 테스트', () => {
  const lottoGame = new LottoGame();

  it('유효하지 않은 로또 규칙을 설정하면 오류를 반환한다.', () => {
    expect(() => lottoGame.setLottoRule(1000, 'invalid')).toThrowError();
    expect(() => lottoGame.setLottoRule(-1000, '1')).toThrowError();
  });

  it('유효하지 않은 사용자 금액을 입력하면 오류를 반환한다.', () => {
    lottoGame.setLottoRule(1000, '1');

    expect(() => lottoGame.setTickets(-1000)).toThrowError();
    expect(() => lottoGame.setTickets(500)).toThrowError();
  });

  it('유효하지 않은 당첨 번호를 설정하면 오류를 반환한다.', () => {
    lottoGame.setLottoRule(1000, '1');
    lottoGame.setTickets(1000);

    expect(() =>
      lottoGame.setWinningLotto([1, 2, 3, 4, 5, 5], 6)
    ).toThrowError();
    expect(() =>
      lottoGame.setWinningLotto([1, 2, 3, 4, 5, 6], -10)
    ).toThrowError();
    expect(() =>
      lottoGame.setWinningLotto([1, 2, 3, 4, 5, 6, 7], 10)
    ).toThrowError();
    expect(() =>
      lottoGame.setWinningLotto([1, 2, 3, 4, 5, 6], 6)
    ).toThrowError();
  });
});
