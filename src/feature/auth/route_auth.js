import express from "express";
import { controllerAuthRegistration, controllerAuthLogin, controllerAuthRefreshToken, controllerAuthOTPSend } from "./controller_auth.js";

const routerAuth = express.Router();

routerAuth.post("/registration", controllerAuthRegistration);
routerAuth.post("/login", controllerAuthLogin);
routerAuth.get("/refresh-token", controllerAuthRefreshToken);
routerAuth.post("/otp-send", controllerAuthOTPSend);

export default routerAuth;