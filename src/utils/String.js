export function makeMoneyForm(money) {
  const reversedMoney = String(money).split('').reverse();
  const stack = [];

  reversedMoney.forEach((num, index) => {
    if (reversedMoney[index + 1] !== undefined && index % 3 === 0) {
      stack.push(',');
    }
    stack.push(num);
  });

  return stack.reverse().join('');
}
