import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import { PackageController } from "./package.controller.js";
const router = express.Router();

router.post(
  "/create-package",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // validateRequest(FaqValidation.addFaqZodSchema),
  PackageController.createPackage
);

router.get(
  "/",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  PackageController.getAllPackage
);

router.delete(
  "/delete-many",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PackageController.deleteManyPackage
);

router.get(
  "/:id",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // validateRequest(FaqValidation.addFaqZodSchema),
  PackageController.getOnePackage
);

router.put(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PackageController.updateOnePackage
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PackageController.deleteOnePackage
);

router.put(
  "/update-visibility/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PackageController.updateVisibility
);

router.put(
  "/update-popularity/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PackageController.updatePopularity
);


export const PackageRoutes = router;
