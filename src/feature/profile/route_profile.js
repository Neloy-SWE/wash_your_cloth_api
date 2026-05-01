import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { controllerProfileChangePassword, controllerProfileChangePhone, controllerProfileView } from "./controller_profile.js";

const routeProfile = express.Router();

routeProfile.patch("/change-password", middlewareAuth, controllerProfileChangePassword);
routeProfile.patch("/change-phone", middlewareAuth, controllerProfileChangePhone);
routeProfile.get("/view", middlewareAuth, controllerProfileView);

export default routeProfile;