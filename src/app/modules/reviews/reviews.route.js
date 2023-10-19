import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import validateRequest from "../../middleware/validateRequest.js";
import { ReviewValidation } from "./reviews.validation.js";
import { ReviewController } from "./reviews.controller.js";
import limiter from "../../middleware/limiter.js";

const router = express.Router();

router.post(
  "/submit-review",
  limiter,
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.addReviewZodSchema),
  ReviewController.submitReview
);

router.get(
  "/",
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.getAllReview
);

router.put(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.updateReadCount
);

router.delete(
  "/delete-many",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.deleteManyReview
);


router.put(
  "/update-visibility/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.updateVisibility
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.deleteOneReview
);

export const ReviewRoutes = router;
