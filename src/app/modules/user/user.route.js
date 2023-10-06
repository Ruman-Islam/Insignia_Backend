import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/users.js";
const router = express.Router();

router.get(
  "/test",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  function async(req, res) {
    res.send("data is coming");
  }
);

export const UserRoutes = router;
