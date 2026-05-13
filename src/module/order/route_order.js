import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middlewareRole } from "../../middleware/middleware_role.js";
import { controllerOrderListShop, controllerOrderListUser, controllerOrderPlace } from "./controller_order.js";

const routerOrder = express.Router();

routerOrder.post("/place", middlewareAuth, middlewareRole("user"), controllerOrderPlace);
routerOrder.get("/list-user", middlewareAuth, middlewareRole("user"), controllerOrderListUser);
routerOrder.get("/list-shop/:shopId", middlewareAuth, middlewareRole("shop"), controllerOrderListShop);

export default routerOrder;