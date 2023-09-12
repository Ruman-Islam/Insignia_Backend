import express from "express";
import { AuthController } from "./auth.controller.js";
const router = express.Router();

router.post(
  "/google-login",
  // validateRequest(AuthValidation.authZodSchema),
  AuthController.googleLogin
);

export const AuthRoutes = router;
