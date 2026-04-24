import express from "express";
import { createUser } from "./controller_user.js";

const routerUser = express.Router();

routerUser.post("/registration", createUser);

export default routerUser;