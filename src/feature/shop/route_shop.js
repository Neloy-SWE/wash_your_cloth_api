import express from "express";
import { controllerShopOpen } from "./controller_shop.js";
import { middleware_role } from "../../middleware/middleware_role.js";
import { middlewareAuth } from "../../middleware/middleware_auth.js";

const routerShop = express.Router();

routerShop.post("/open",middlewareAuth, middleware_role("shop"),controllerShopOpen);

export default routerShop;