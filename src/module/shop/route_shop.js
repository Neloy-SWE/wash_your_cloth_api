import express from "express";
import { middlewareRole } from "../../middleware/middleware_role.js";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { controllerShopDetails, controllerShopList, controllerShopUpdate, controllerShopView } from "./controller_shop.js";

const routerShop = express.Router();

// routerShop.post("/open",middlewareAuth, middleware_role("shop"),controllerShopOpen);
routerShop.get("/view", middlewareAuth, middlewareRole("shop"), controllerShopView);
routerShop.patch("/update", middlewareAuth, middlewareRole("shop"), controllerShopUpdate);
routerShop.get("/list", middlewareAuth, middlewareRole("user"), controllerShopList);
routerShop.get("/details/:shopId", middlewareAuth, middlewareRole("user"), controllerShopDetails);

export default routerShop;