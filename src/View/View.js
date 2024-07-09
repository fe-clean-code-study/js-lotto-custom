import { readLineAsync } from '../utils/readline.js';
import LottoRule from '../domain/LottoRule.js';

export default class View {
  constructor() {
    this.rl = readLineAsync;
  }

  async input(
    message,
    options = {
      postProcessFn: undefined,
      errorCheckFn: undefined,
    },
  ) {
    const { postProcessFn, errorCheckFn } = options;
    const postProcessFnError = View.getPostProcessFnError(postProcessFn);
    const errorCheckFnError = View.getErrorCheckFnError(errorCheckFn);

    if (postProcessFnError !== undefined || errorCheckFnError !== undefined) {
      throw new Error(postProcessFnError || errorCheckFnError);
    }

    while (true) {
      const inputValue = await this.rl(message);
      const postInputValue = postProcessFn
        ? postProcessFn(inputValue)
        : inputValue;
      const error = errorCheckFn
        ? errorCheckFn(postInputValue)
        : postInputValue;

      if (error === undefined) {
        return postInputValue;
      }

      console.log(error);
    }
  }

  async inputPurchaseLotto(
    options = {
      postProcessFn: undefined,
      errorCheckFn: undefined,
    },
  ) {
    return this.input('> 구입금액을 입력해 주세요:', options);
  }

  async inputWinLotto(
    options = {
      postProcessFn: undefined,
      errorCheckFn: undefined,
    },
  ) {
    return this.input('> 당첨 번호를 콤마(,)로 구분해 입력해 주세요:', options);
  }

  async inputBonusNumber(
    options = {
      postProcessFn: undefined,
      errorCheckFn: undefined,
    },
  ) {
    return this.input('> 보너스 번호를 입력해 주세요: ', options);
  }

  printPurchaseLotto(quantity) {
    console.log(`${quantity}개를 구매했습니다.`);
    console.log('\n');
  }

  printAllLotto(lottos) {
    lottos.forEach((lotto) => {
      console.log(lotto);
    });
    console.log('\n');
  }

  printAccordByRank(rankInfo) {
    const ranks = Object.keys(rankInfo);

    console.log('당첨 통계');
    console.log('--------------------');

    ranks.forEach((rank) => {
      console.log(
        `${LottoRule.ACCROD_STRING_BY_RANK[rank]} - ${rankInfo[rank]}개`,
      );
    });
  }

  printRate(rate) {
    console.log(`총 수익률은 ${rate}% 입니다.`);
  }

  static getPostProcessFnError(postProcessFn) {
    if (postProcessFn !== undefined && typeof postProcessFn !== 'function') {
      return '후처리 함수(postProcessFn)는 함수 타입이어야 합니다.';
    }

    return undefined;
  }

  static getErrorCheckFnError(errorCheckFn) {
    if (errorCheckFn !== undefined && typeof errorCheckFn !== 'function') {
      return '에러 검사 함수(errorCheckFn)는 함수 타입이어야 합니다.';
    }

    return undefined;
  }
}
