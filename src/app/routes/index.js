import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { UserRoutes } from "../modules/user/user.route.js";
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
];

// Iterate over the moduleRoutes array and mount each route on the router
moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
