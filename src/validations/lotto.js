import createValidator from "./createValidator.js";

export const lottoValidations = {
  lottoType: {
    check: ({ type }) => type === 'winning' || type === 'ticket',
    errorMessage: '로또는 ticket, winning 두 가지 유형이어야 합니다.'
  },
  lottoNumbersLength: {
    check: ({ numbers }) => numbers.length === 6,
    errorMessage: '로또 번호는 6개여야 합니다.'
  },
  winningLottoHasBonus: {
    check: ({ type, bonusNumber }) => type === 'winning' ? Boolean(bonusNumber) : true,
    errorMessage: '당첨 로또 번호는 보너스 번호를 가져야 합니다.'
  },
  ticketLottoBonusNull: {
    check: ({ type, bonusNumber }) => type === 'ticket' ? bonusNumber === null : true,
    errorMessage: '구매한 로또 번호는 보너스 번호가 없어야 합니다.'
  },
  lottoEachUnique: {
    check: ({ numbers, bonusNumber }) => new Set(numbers).size === numbers.length && !numbers.includes(bonusNumber),
    errorMessage: '로또 번호는 각각 달라야 합니다.'
  },
  lottoInteger: {
    check: ({ numbers, bonusNumber }) => {
      const lottoNumbers = bonusNumber === null? numbers : [...numbers, bonusNumber]
      return lottoNumbers.every(number => Number.isInteger(number))
    },
    errorMessage: '모든 로또 번호는 정수여야 합니다.'
  },
  lottoRange: {
    check: ({ numbers, bonusNumber }) => {
      const lottoNumbers = bonusNumber === null ? numbers : [...numbers, bonusNumber]
      return lottoNumbers.every(number => 1 <= number && number <= 45)
    },
    errorMessage: '모든 로또 번호는 1 이상 45 이하여야 합니다.'
  }
}

export const validateLotto = createValidator(lottoValidations)