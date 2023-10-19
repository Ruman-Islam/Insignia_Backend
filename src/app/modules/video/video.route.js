import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import validateRequest from "../../middleware/validateRequest.js";
import { VideoValidation } from "./video.validation.js";
import { VideoController } from "./video.controller.js";

const router = express.Router();

router.post(
  "/add/video",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(VideoValidation.addVideoZodSchema),
  VideoController.addVideo
);

router.post(
  "/update-one",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(VideoValidation.updateVideoZodSchema),
  VideoController.updateOneVideo
);

router.get(
  "/",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  VideoController.getAllVideo
);

router.delete(
  "/delete-many",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  VideoController.deleteManyVideo
);

router.put(
  "/update-visibility/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  VideoController.updateVisibility
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  VideoController.deleteOneVideo
);

export const VideoRoutes = router;
