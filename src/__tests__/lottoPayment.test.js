import LottoPayment from "../domain/LottoPayment.js";
import { lottoPaymentValidations } from "../validations/lottoPayment.js";

describe('로또 결제 테스트', () => {
  test('로또 결제 금액은 정수여야 한다.', () => {
    expect(() => LottoPayment.createLottoTickets({
      payAmount: '1000'
    })).toThrow(lottoPaymentValidations.payAmountInteger.errorMessage)
  })

  test('로또 결제는 1000원 단위로만 가능하다.', () => {
    expect(() => LottoPayment.createLottoTickets({
      payAmount: 1100
    })).toThrow(lottoPaymentValidations.payAmountUnit1000.errorMessage)
  })

  test('1000원 당 1장의 로또 티켓을 발행해야 한다.', () => {
    expect(LottoPayment.createLottoTickets({
      payAmount: 8000
    }).length).toBe(8)
  })
})