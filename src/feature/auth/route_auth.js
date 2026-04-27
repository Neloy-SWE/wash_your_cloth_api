import express from "express";
import { controllerAuthRegistration, controllerAuthLogin, controllerAuthRefreshToken } from "./controller_auth.js";

const routerAuth = express.Router();

routerAuth.post("/registration", controllerAuthRegistration);
routerAuth.post("/login", controllerAuthLogin);
routerAuth.get("/refresh-token", controllerAuthRefreshToken);

export default routerAuth;