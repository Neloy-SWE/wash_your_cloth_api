import express from "express";
import { controllerAuthRegistration, controllerAuthLogin, controllerAuthLogout, controllerAuthRefreshToken, controllerAuthOTPVerify } from "./controller_auth.js";
import { middlewareAuth } from "../../middleware/middleware_auth.js";

const routerAuth = express.Router();

routerAuth.post("/registration", controllerAuthRegistration);
routerAuth.post("/login", controllerAuthLogin);
routerAuth.post("/refresh-token", controllerAuthRefreshToken);
routerAuth.post("/logout", middlewareAuth, controllerAuthLogout);
routerAuth.post("/otp-verify", controllerAuthOTPVerify);

export default routerAuth;