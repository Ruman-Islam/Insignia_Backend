import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import validateRequest from "../../middleware/validateRequest.js";
import { PhotoValidation } from "./photos.validation.js";
import { PhotosController } from "./photos.controller.js";
const router = express.Router();

router.post(
  "/add/photo",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(PhotoValidation.addPhotoZodSchema),
  PhotosController.addPhoto
);

router.get(
  "/",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  PhotosController.getAllPhoto
);

router.delete(
  "/delete-many",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PhotosController.deleteManyPhoto
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PhotosController.deleteOnePhoto
);

router.put(
  "/update-visibility/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PhotosController.updateVisibility
);

export const PhotoRoutes = router;
