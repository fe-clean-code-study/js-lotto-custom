export class WinningLotto {
  public readonly numbers: number[] = [];
  public readonly bonusNumber: number;

  constructor(numbers: number[], bonusNumber: number) {
    this.numbers = numbers;
    this.bonusNumber = bonusNumber;
  }
}
