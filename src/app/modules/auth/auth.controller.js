import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { AuthService } from "./auth.services.js";
import sendResponse from "../../../shared/sendResponse.js";

const googleLogin = catchAsync(async (req, res) => {
  const { credential }  = req.body;
  // Call the UserService to create the user
  /* const { refreshToken, ...others } =  */ await AuthService.googleLogin(
    credential
  );

  // set refresh token into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully",
    meta: null,
    data: null,
  });
});

export const AuthController = {
  googleLogin,
};
