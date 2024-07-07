import Lotto from "./domain/Lotto.js";
async function main() {
  new Lotto({
    type: LOTTO_TYPE.TICKET,
    numbers: [1,2,3,4,5,6]
  })
}

main();

// 로또Q:q