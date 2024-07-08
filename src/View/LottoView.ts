import readline from 'readline';

export class LottoView {
  public async getMoney(): Promise<number> {
    const inputValue = await this.ask('구입 금액을 입력해 주세요. : ');

    return Number(inputValue);
  }

  public async getWinningNumbers(): Promise<number[]> {
    const inputValue = await this.ask('당첨 번호를 입력해 주세요. : ');

    return inputValue.split(',').map((number) => Number(number));
  }

  public async getWinningBonusNumber(): Promise<number> {
    const inputValue = await this.ask('보너스 번호를 입력해 주세요. : ');

    return Number(inputValue);
  }

  public ask(query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error('arguments must be 1'));
      }

      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }

  public printMessage(message: string) {
    console.log(message);
  }
}
