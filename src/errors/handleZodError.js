import httpStatus from "http-status";

const handleZodError = (error) => {
  // Extract the error messages from the Zod error
  const errors = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: "Zod Error",
    errorMessages: errors,
  };
};

export default handleZodError;
