//common error messages
export const ErrorMessages = {
  somethingWentWrong: "Something went wrong.",
  internalServerError: "Internal server error.",
  validationError: "Validation error.",
  invalidRequest: "Invalid request. Please check the parameter and try again.",
  notExist: (value: any) => `${value} not exist.`,
  alreadyExists: (value: any) => `${value} already exists.`,
  errorLog: (functionName: string, e: any) => {
    return `${functionName} Error @ ${e}`;
  },
};
