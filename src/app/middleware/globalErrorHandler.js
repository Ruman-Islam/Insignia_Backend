import config from "../../config/index.js";
import ApiError from "../../errors/ApiError.js";
import handleValidationError from "../../errors/handleValidationError.js";
import handleZodError from "../../errors/handleZodError.js";
import handleCastError from "../../errors/handleCastError.js";
import { ZodError } from "zod";
import httpStatus from "http-status";

const globalErrorHandler = (
  error, // <= All the error comes through  this error
  req, // Express request object
  res, // Express response object
  next // Express next function
) => {
  // console.log(error)
  // config.env === 'development'
  //   ? console.log(`❌👮‍♀️ globalErrorHandler ~`, error)
  //   : console.log(`❌❌ globalErrorHandler ~`, error);
  // ..................

  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let errorMessages = [];
  // ..................
  let simplifiedError;

  // When mongoose schema validation error caught
  switch (true) {
    case error?.name === "ValidationError":
      simplifiedError = handleValidationError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error?.name === "CastError":
      simplifiedError = handleCastError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error instanceof ZodError:
      simplifiedError = handleZodError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorMessages = simplifiedError?.errorMessages;
      // ...
      break;

    case error instanceof ApiError:
      statusCode = error?.statusCode;
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: "",
              message: error?.message,
            },
          ]
        : [];
      // ...
      break;

    case error instanceof Error:
      statusCode = error?.statusCode;
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: "",
              message: error?.message,
            },
          ]
        : [];
      // ...
      break;
  }

  // Generic Error Response
  next();
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config?.env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
