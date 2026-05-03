import express from "express";
import { middleware_role } from "../../middleware/middleware_role.js";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { controllerShopView } from "./controller_shop.js";

const routerShop = express.Router();

// routerShop.post("/open",middlewareAuth, middleware_role("shop"),controllerShopOpen);
routerShop.get("/view",middlewareAuth, middleware_role("shop"),controllerShopView);

export default routerShop;