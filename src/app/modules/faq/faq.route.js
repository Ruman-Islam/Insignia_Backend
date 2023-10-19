import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import validateRequest from "../../middleware/validateRequest.js";
import { FaqValidation } from "./faq.validation.js";
import { FaqController } from "./faq.controller.js";
const router = express.Router();

router.post(
  "/create/faq",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FaqValidation.addFaqZodSchema),
  FaqController.createFaq
);

router.get(
  "/",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  FaqController.getAllFaq
);

router.post(
  "/update-one",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.updateOneFaq
);

router.delete(
  "/delete-many",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.deleteManyFaq
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.getOneFaq
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.deleteOneFaq
);


router.put(
  "/update-visibility/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.updateVisibility
);

export const FaqRoutes = router;
