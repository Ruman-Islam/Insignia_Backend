import express from "express";
import validateRequest from "../../middleware/validateRequest.js";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import { AdminController } from "./admin.controller.js";
import { AdminValidation } from "./admin.validation.js";
const router = express.Router();

router.post("/upload/banner-image", AdminController.bannerImageUpload);

router.post("/upload/window-image", AdminController.windowImageUpload);

router.post(
  "/upload/banner-title",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminValidation.updateBannerTitleZodSchema),
  AdminController.bannerTitleUpdate
);

router.get(
  "/get/system-config",
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getSystemConfig
);

export const AdminRoutes = router;
