import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import { jwtHelpers } from "../../helper/jwtHelpers.js";
import config from "../../config/index.js";

const auth =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED!");
      }

      let verifiedUser = null;

      try {
        verifiedUser = jwtHelpers.verifiedToken(token, config?.jwt?.secret);
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN!");
      }

      req.user = verifiedUser;

      // guard of role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
