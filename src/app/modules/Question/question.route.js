import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
import validateRequest from "../../middleware/validateRequest.js";
import { QuestionValidation } from "./question.validation.js";
import { QuestionController } from "./question.controller.js";
import limiter from "../../middleware/limiter.js";
const router = express.Router();

router.post(
  "/add/question",
  limiter,
  validateRequest(QuestionValidation.addQuestionZodSchema),
  QuestionController.addQuestion
);

router.delete(
  "/delete-many",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuestionController.deleteManyQuestion
);

router.get(
  "/",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuestionController.getAllQuestion
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuestionController.deleteOneQuestion
);

router.put(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  QuestionController.updateReadCount
);

export const QuestionRoutes = router;
