/**
 * @todo
 * clean-code-rule-toolkit으로 반영될 예정입니다.
 */

function random(minimum, maximum) {
  if (minimum >= maximum) {
    throw new Error("maximum은 minimum보다 커야 합니다.");
  }

  return Math.random() * (maximum - minimum) + minimum;
}

function randomInt(minimum, maximum) {
  return Math.floor(random(minimum, maximum));
}

export function makeLotto() {
  const lottoNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
  const result = [];

  for (let i = 0; i < 6; i++) {
    const randomNumber = randomInt(i, lottoNumbers.length);
    const value = lottoNumbers[randomNumber];

    lottoNumbers[randomNumber] = lottoNumbers[i];
    lottoNumbers[i] = value;

    result.push(value);
  }

  return result;
}
