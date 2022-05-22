const fs = require("fs").promises;

//Handle with errors
export const ErrorHandler: any = {};

ErrorHandler.getErrorMessage = (error: unknown) => {
  let today = new Date();
  if (error instanceof Error)
    return today.toDateString() + ":" + error.message + "\n";
  else return today.toDateString() + ":" + String(error) + "\n";
};

//Logging the errors
ErrorHandler.reportError = async (message: string) => {
  await fs.appendFile("public/logs.txt", message);
};
