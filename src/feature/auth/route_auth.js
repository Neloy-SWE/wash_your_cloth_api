import express from "express";
import { controllerCreateUser } from "./controller_auth.js";

const routerAuth = express.Router();

routerAuth.post("/registration", controllerCreateUser);

export default routerAuth;