import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { controllerUserChangePassword, controllerUserChangePhone, controllerUserUpdateUser, controllerUserView } from "./controller_user.js";
import { middleware_role } from "../../middleware/middleware_role.js";

const routeUser = express.Router();

routeUser.patch("/change-password", middlewareAuth, controllerUserChangePassword);
routeUser.patch("/change-phone", middlewareAuth, controllerUserChangePhone);
routeUser.get("/view", middlewareAuth, middleware_role("user"), controllerUserView);
routeUser.patch("/update", middlewareAuth, middleware_role("user"), controllerUserUpdateUser);

export default routeUser;