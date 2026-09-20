import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middlewareRole } from "../../middleware/middleware_role.js";
import { controllerOrderDeactive, controllerOrderDetailsShop, controllerOrderDetailsUser, controllerOrderList, controllerOrderPlace } from "./controller_order.js";

const routerOrder = express.Router();

routerOrder.post("/place", middlewareAuth, middlewareRole("user"), controllerOrderPlace);
routerOrder.get("/list", middlewareAuth, middlewareRole("user", "shop"), controllerOrderList);
routerOrder.get("/details-user/:orderId", middlewareAuth, middlewareRole("user"), controllerOrderDetailsUser);
routerOrder.get("/details-shop/:orderId", middlewareAuth, middlewareRole("shop"), controllerOrderDetailsShop);
routerOrder.patch("/delete/:orderId", middlewareAuth, middlewareRole("user"), controllerOrderDeactive);

export default routerOrder;