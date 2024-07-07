import { getRandomNumber } from '../utils/getRandomNumber.js';

const createLottoNumbers = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < 6) {
    lottoNumbers.add(getRandomNumber(1, 45));
  }
  return [...lottoNumbers];
};

export default createLottoNumbers;
