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

// router.get(
//   "/logout",
//   // validateRequest(AuthValidation.refreshTokenZodSchema),
//   AuthController.logout
// );

// ^ Under development
// router.get(
//   "/refresh/token",
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   AuthController.refreshToken
// );
// ^ .......................

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
  "/reset/password",
  validateRequest(AuthValidation.resetPasswordZodSchema),
  AuthController.resetPassword
);

router.post(
  "/change/password",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
