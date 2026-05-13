import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middlewareRole } from "../../middleware/middleware_role.js";
import { controllerOrderPlace } from "./controller_order.js";

const routerOrder = express.Router();

routerOrder.post("/place", middlewareAuth, middlewareRole("user"), controllerOrderPlace);

export default routerOrder;