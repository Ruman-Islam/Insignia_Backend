import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import { UserController } from "./user.controller.js";
import { UserValidation } from "./user.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
import { singleImageUploader } from "../../middleware/multer.js";
const router = express.Router();

router.get(
  "/",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getUserList
);

router.patch(
  "/profile/update",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserProfileZodSchema),
  UserController.profileUpdate
);

router.post(
  "/profile-image/update",
  auth(ENUM_USER_ROLE.USER),
  singleImageUploader,
  UserController.profileImageUpdate
);

router.delete(
  "/delete-many",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteManyCustomer
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getOneCustomer
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteOneCustomer
);

router.put(
  "/update-block-status/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateBlockStatus
);

export const UserRoutes = router;
