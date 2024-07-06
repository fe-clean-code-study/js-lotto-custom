import createValidator from "./createValidator.js";

export const lottoPaymentValidations = {
  payAmountInteger: {
    check: ({ payAmount }) => Number.isInteger(payAmount),
    errorMessage: '로또 결제 금액은 숫자(정수)여야 합니다.'
  },
  payAmountUnit1000: {
    check: ({ payAmount }) => payAmount % 1000 === 0,
    errorMessage: '로또 결제는 1000원 단위로만 가능합니다.'
  }
}

export const validateLottoPayment = createValidator(lottoPaymentValidations)