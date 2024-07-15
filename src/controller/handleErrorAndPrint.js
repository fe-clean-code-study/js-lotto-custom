import { getUserFriendlyErrorMessage } from "../utils/index.js";
import { USER_FRIENDLY_ERROR_MESSAGES } from "../constants/index.js";
import { outputManager } from "../service/index.js";

const handleErrorAndPrint = (error) => {
  const errorMessage = getUserFriendlyErrorMessage(
    error.message,
    USER_FRIENDLY_ERROR_MESSAGES
  );

  outputManager.print(errorMessage);
};

export default handleErrorAndPrint;
