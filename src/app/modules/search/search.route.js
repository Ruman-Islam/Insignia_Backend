import express from "express";
import { SearchController } from "./search.controller.js";

const router = express.Router();


router.get(
    "/auto-suggestion",
    // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    SearchController.getAllQueries
  );








export const SearchRoutes = router;