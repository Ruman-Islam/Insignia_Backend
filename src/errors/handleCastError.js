import httpStatus from "http-status";

const handleCastError = (error) => {
  // Extract the error messages from the validation error
  const errors = [
    {
      path: error.path,
      message: "Invalid Id",
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: "Cast Error",
    errorMessages: errors,
  };
};

export default handleCastError;
