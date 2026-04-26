import express from "express";
import { controllerAuthRegistration, controllerLogin } from "./controller_auth.js";

const routerAuth = express.Router();

routerAuth.post("/registration", controllerAuthRegistration);
routerAuth.post("/login", controllerLogin);

export default routerAuth;