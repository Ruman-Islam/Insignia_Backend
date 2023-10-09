import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import { UserController } from "./user.controller.js";
import { UserValidation } from "./user.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
const router = express.Router();

router.patch(
  "/profile/update",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  validateRequest(UserValidation.updateUserProfileZodSchema),
  UserController.profileUpdate
);

export const UserRoutes = router;
