import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import { UserController } from "./user.controller.js";
import { UserValidation } from "./user.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
import { singleImageUploader } from "../../middleware/multer.js";
const router = express.Router();

router.patch(
  "/profile/update",
  auth(ENUM_USER_ROLE.USER),
  validateRequest(UserValidation.updateUserProfileZodSchema),
  UserController.profileUpdate
);

router.post(
  "/profile-image/update",
  auth(ENUM_USER_ROLE.USER),
  singleImageUploader,
  UserController.profileImageUpdate
);

export const UserRoutes = router;
