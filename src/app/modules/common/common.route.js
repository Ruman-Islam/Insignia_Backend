import express from "express";
import { CommonController } from "./common.controller.js";
const router = express.Router();

router.get("/get/system-config", CommonController.getSystemConfig);

export const commonRoutes = router;
