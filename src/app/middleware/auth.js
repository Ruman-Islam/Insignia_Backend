import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import { jwtHelpers } from "../../helper/jwtHelpers.js";
import config from "../../config/index.js";

const auth =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      const token = req.headers["x-auth-token"];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifiedToken(token, config?.jwt?.secret);

      req.user = verifiedUser;
      // guard of role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
