import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { AuthService } from "./auth.services.js";
import sendResponse from "../../../shared/sendResponse.js";
import config from "../../../config/index.js";
import ApiError from "../../../errors/ApiError.js";

const register = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;
  const result = await AuthService.register(registerData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Registration successful!",
    meta: null,
    data: others,
  });
});

const login = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.login(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful!",
    meta: null,
    data: others,
  });
});

const googleLogin = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;
  const code = authHeader.split(" ")[1];
  const result = await AuthService.googleLogin(code);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful!",
    meta: null,
    data: others,
  });
});

const logout = catchAsync(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refreshToken)
    throw ApiError(httpStatus.BAD_REQUEST, "Refresh token is required");

  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: config.env === "production",
  };

  res.clearCookie("refreshToken", cookieOptions);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logout successful!",
    meta: null,
    data: null,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token successful!ly",
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
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    httpOnly: true,
    sameSite: "None",
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "password reset successful!",
    meta: null,
    data: others,
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
};
