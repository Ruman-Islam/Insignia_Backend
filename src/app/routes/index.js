import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { UserRoutes } from "../modules/user/user.route.js";
import { AdminRoutes } from "../modules/admin/admin.route.js";
import { commonRoutes } from "../modules/common/common.route.js";
import { FaqRoutes } from "../modules/faq/faq.route.js";
import { VideoRoutes } from "../modules/video/video.route.js";
import { QuestionRoutes } from "../modules/Question/question.route.js";
import { ReviewRoutes } from "../modules/reviews/reviews.route.js";
import { PhotoRoutes } from "../modules/photos/photos.route.js";
const routes = express.Router();

// Defining an array of module routes to be mounted on the router
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/common",
    route: commonRoutes,
  },
  {
    path: "/faq",
    route: FaqRoutes,
  },
  {
    path: "/video",
    route: VideoRoutes,
  },
  {
    path: "/question",
    route: QuestionRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/photo",
    route: PhotoRoutes,
  },
];

// Iterate over the moduleRoutes array and mount each route on the router
moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
