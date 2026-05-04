import express from "express";
import { middleware_role } from "../../middleware/middleware_role.js";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { controllerShopDetails, controllerShopList, controllerShopUpdate, controllerShopView } from "./controller_shop.js";

const routerShop = express.Router();

// routerShop.post("/open",middlewareAuth, middleware_role("shop"),controllerShopOpen);
routerShop.get("/view", middlewareAuth, middleware_role("shop"), controllerShopView);
routerShop.patch("/update", middlewareAuth, middleware_role("shop"), controllerShopUpdate);
routerShop.get("/list", middlewareAuth, middleware_role("user"), controllerShopList);
routerShop.get("/details/:shopId", middlewareAuth, middleware_role("user"), controllerShopDetails);

export default routerShop;