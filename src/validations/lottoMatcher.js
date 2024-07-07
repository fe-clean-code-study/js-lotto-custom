import Lotto from "../domain/Lotto.js";
import createValidator from "./createValidator.js";
import LOTTO_TYPE from "../constants/lottoType.js";

export const lottoMatcherValidations = {
  validWinningLotto: {
    check: ({ winningLotto }) => winningLotto instanceof Lotto && winningLotto.type === LOTTO_TYPE.WINNING,
    errorMessage: '유효한 로또 당첨 정보가 아닙니다.'
  },
  validLottoTickets: {
    check: ({ lottoTickets }) => lottoTickets.every(lottoTicket => lottoTicket instanceof Lotto && lottoTicket.type === LOTTO_TYPE.TICKET),
    errorMessage: '유효하지 않은 로또 티켓이 존재합니다.'
  }
}

export const validateLottoMatcher = createValidator(lottoMatcherValidations)