import {createLottoTicket, createWinningLotto} from "../domain/Lotto.js";
import LottoMatcher from "../domain/LottoMatcher.js";
import {lottoMatcherValidations} from "../validations/lottoMatcher.js";
import LOTTO_TYPE from "../constants/lottoType.js";

describe('로또 번호 일치여부 계산 테스트', () => {

  test('유효한 당첨 로또로만 계산할 수 있다.', () => {
    const validLottoTicket = createLottoTicket([11,12,13,14,15,16])

    expect(() => new LottoMatcher({
      winningLotto: { type: LOTTO_TYPE.WINNING, numbers: [1,2,3,4,5,6], bonusNumber: 8 },
      lottoTickets: [ validLottoTicket ]
    })).toThrow(lottoMatcherValidations.validWinningLotto.errorMessage)

    expect(() => new LottoMatcher({
      winningLotto: validLottoTicket,
      lottoTickets: [ validLottoTicket ]
    })).toThrow(lottoMatcherValidations.validWinningLotto.errorMessage)
  })

  test('유효한 로또 티켓들만 계산할 수 있다.', () => {
    const validWinningLotto = createWinningLotto(
      [1,2,3,4,5,6], 7
    )

    expect(() => new LottoMatcher({
      winningLotto: validWinningLotto,
      lottoTickets: [ { type: LOTTO_TYPE.TICKET, numbers: [1,2,3,4,5,6] } ]
    }))

    expect(() => new LottoMatcher({
      winningLotto: validWinningLotto,
      lottoTickets: [ validWinningLotto ]
    })).toThrow(lottoMatcherValidations.validLottoTickets.errorMessage)
  })

  test('로또 티켓들의 [당첨 번호 일치 개수, 보너스 번호 일치 여부]를 반환한다.', () => {
    const winningLotto = createWinningLotto([1,2,3,4,5,6], 7)
    const lottoTicket1 = createLottoTicket([1,2,3,14,15,16]) // 3, false
    const lottoTicket2 = createLottoTicket([11,12,13,14,15,16]) // 0, false
    const lottoTicket3 = createLottoTicket([1,2,3,4,7,8]) // 4, true

    const lottoMatcher = new LottoMatcher({
      winningLotto,
      lottoTickets: [lottoTicket1, lottoTicket2, lottoTicket3]
    })
    expect(lottoMatcher.lottoMatchResult).toEqual([
      {
        lotto: lottoTicket1,
        matchCount: 3,
        bonusMatch: false
      },
      {
        lotto: lottoTicket2,
        matchCount: 0,
        bonusMatch: false
      },
      {
        lotto: lottoTicket3,
        matchCount: 4,
        bonusMatch: true
      }
    ])
  })
})