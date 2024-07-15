const getUserFriendlyErrorMessage = (errorMessage, userFriendlyMessages) => {
  const match = errorMessage.match(/^\[(ERR_\d{3})\]/);
  const errorCode = match && match[1];

  return (errorCode && userFriendlyMessages[errorCode]) || errorMessage;
};

export default getUserFriendlyErrorMessage;
