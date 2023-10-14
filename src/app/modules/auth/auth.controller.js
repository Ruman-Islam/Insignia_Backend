import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { AuthService } from "./auth.services.js";
import sendResponse from "../../../shared/sendResponse.js";
import config from "../../../config/index.js";

// const register = catchAsync(async (req, res) => {
//   const { ...registerData } = req.body;
//   const result = await AuthService.register(registerData);
//   const { refreshToken, ...others } = result;

//   // set refresh token into cookie
//   res.cookie(config.refresh_token_name, refreshToken, {
//     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//     sameSite: "none",
//     secure: true,
//     httpOnly: true,
//   });

//   return sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Registration successful!",
//     meta: null,
//     data: others,
//   });
// });

const register = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;
  const result = await AuthService.register(registerData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Registration successful!",
    meta: null,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.login(loginData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful!",
    meta: null,
    data: result,
  });
});

const adminLogin = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.adminLogin(loginData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin login successful!",
    meta: null,
    data: result,
  });
});

const googleLogin = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;
  const code = authHeader.split(" ")[1];
  const result = await AuthService.googleLogin(code);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful!",
    meta: null,
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  // set refresh token into cookie
  const pastExpirationDate = new Date(Date.now() - 3600000);
  res.cookie(config.refresh_token_name, null, {
    expires: pastExpirationDate,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logout successful!",
    meta: null,
    data: null,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { token } = req.body;

  const result = await AuthService.refreshToken(token);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token successfully!",
    meta: null,
    data: result,
  });
});

const adminRefreshToken = catchAsync(async (req, res) => {
  const { token } = req.body;

  const result = await AuthService.adminRefreshToken(token);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token successfully!",
    meta: null,
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { ...forgotPasswordData } = req.body;

  await AuthService.forgotPassword(forgotPasswordData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "An email has been sent!",
    meta: null,
    data: null,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { ...resetPasswordData } = req.body;

  const result = await AuthService.resetPassword(resetPasswordData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successful!",
    meta: null,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const payload = { ...req.body, ...req.user };
  await AuthService.changePassword(payload);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successful!",
    meta: null,
    data: null,
  });
});

export const AuthController = {
  register,
  login,
  logout,
  googleLogin,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  adminLogin,
  adminRefreshToken,
};
