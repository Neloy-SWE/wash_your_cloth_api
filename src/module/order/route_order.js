import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middlewareRole } from "../../middleware/middleware_role.js";
import { controllerOrderDeactive, controllerOrderDetailsShop, controllerOrderDetailsUser, controllerOrderListShop, controllerOrderListUser, controllerOrderPlace } from "./controller_order.js";

const routerOrder = express.Router();

routerOrder.post("/place", middlewareAuth, middlewareRole("user"), controllerOrderPlace);
routerOrder.get("/list-user", middlewareAuth, middlewareRole("user"), controllerOrderListUser);
routerOrder.get("/list-shop", middlewareAuth, middlewareRole("shop"), controllerOrderListShop);
routerOrder.get("/details-user/:orderId", middlewareAuth, middlewareRole("user"), controllerOrderDetailsUser);
routerOrder.get("/details-shop/:orderId", middlewareAuth, middlewareRole("shop"), controllerOrderDetailsShop);
routerOrder.patch("/delete/:orderId", middlewareAuth, middlewareRole("user"), controllerOrderDeactive);

export default routerOrder;