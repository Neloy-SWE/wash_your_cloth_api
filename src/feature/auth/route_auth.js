import express from "express";
import { controllerAuthRegistration, controllerAuthLogin, controllerAuthRefreshToken, controllerAuthOTPVerify, controllerAuthChangePassword } from "./controller_auth.js";
import { authMiddleware } from "../../middleware/middleware_auth.js";

const routerAuth = express.Router();

routerAuth.post("/registration", controllerAuthRegistration);
routerAuth.post("/login", controllerAuthLogin);
routerAuth.get("/refresh-token", controllerAuthRefreshToken);
routerAuth.post("/otp-verify", controllerAuthOTPVerify);
routerAuth.post("/change-password", authMiddleware, controllerAuthChangePassword);

export default routerAuth;