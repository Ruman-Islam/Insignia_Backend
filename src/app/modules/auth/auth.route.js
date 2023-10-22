import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.register
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
);

router.get("/google/login", AuthController.googleLogin);

router.post(
  "/refresh/token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  "/forgot/password",
  validateRequest(AuthValidation.forgotPasswordZodSchema),
  AuthController.forgotPassword
);

router.post(
  "/admin/forgot/password",
  validateRequest(AuthValidation.forgotPasswordZodSchema),
  AuthController.adminForgotPassword
);

router.post(
  "/admin/reset/password",
  validateRequest(AuthValidation.resetPasswordZodSchema),
  AuthController.adminResetPassword
);

router.post(
  "/reset/password",
  validateRequest(AuthValidation.resetPasswordZodSchema),
  AuthController.resetPassword
);

router.post(
  "/change/password",
  auth(ENUM_USER_ROLE.USER),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

router.post(
  "/admin/change/password",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.adminChangePassword
);

router.post(
  "/admin/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.adminLogin
);

router.post(
  "/admin/refresh/token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.adminRefreshToken
);

export const AuthRoutes = router;
