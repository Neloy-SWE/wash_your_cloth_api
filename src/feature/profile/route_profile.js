import express from "express";
import { authMiddleware } from "../../middleware/middleware_auth.js";
import { controllerProfileChangePassword } from "./controller_profile.js";

const routeProfile = express.Router();

routeProfile.patch("/change-password", authMiddleware, controllerProfileChangePassword);

export default routeProfile;