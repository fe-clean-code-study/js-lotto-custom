import Lotto from "../domain/lotto";
import { winRuleSchema } from "../main";

export const setupLotto = () => {
  return Lotto(winRuleSchema);
};
