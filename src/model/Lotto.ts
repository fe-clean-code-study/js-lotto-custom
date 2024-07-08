export class Lotto {
  public readonly numbers: number[] = [];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  public matchNumbers(winningNumbers: number[], bonusNumber: number) {
    const matchedCount = this.numbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;

    const includedBonusNumber = this.numbers.includes(bonusNumber);

    return {
      matchedCount,
      includedBonusNumber,
    };
  }
}
