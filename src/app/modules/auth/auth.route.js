import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
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

router.get(
  "/logout",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.logout
);

router.get(
  "/refresh/token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
