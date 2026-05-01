import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { controllerProfileChangePassword, controllerProfileChangePhone } from "./controller_profile.js";

const routeProfile = express.Router();

routeProfile.patch("/change-password", middlewareAuth, controllerProfileChangePassword);
routeProfile.patch("/change-phone", middlewareAuth, controllerProfileChangePhone);

export default routeProfile;