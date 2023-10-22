import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import { jwtHelpers } from "../../helper/jwtHelpers.js";
import config from "../../config/index.js";
import User from "../modules/user/user.model.js";

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

      if (verifiedUser.role === "user") {
        const user = await User.findOne({ userId: verifiedUser.userId })
        if (user.blockStatus) {
          throw new ApiError(httpStatus.FORBIDDEN, "You've been blocked!");
        }
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
