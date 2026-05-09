import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middlewareRole } from "../../middleware/middleware_role.js";
import { controllerResourceItemActivation, controllerResourceItemAdd, controllerResourceItemList, controllerResourcePriceActivation, controllerResourcePriceAdd, controllerResourcePriceListShop, controllerResourcePriceListUser, controllerResourceServiceList } from "./controller_resource.js";

const routerResource = express.Router();

routerResource.get("/service-list", middlewareAuth, middlewareRole("shop"), controllerResourceServiceList);
routerResource.post("/item-add", middlewareAuth, middlewareRole("shop"), controllerResourceItemAdd);
routerResource.get("/item-list", middlewareAuth, middlewareRole("shop"), controllerResourceItemList);
routerResource.patch("/item-activation/:itemId", middlewareAuth, middlewareRole("shop"), controllerResourceItemActivation);
routerResource.post("/price-add", middlewareAuth, middlewareRole("shop"), controllerResourcePriceAdd);
routerResource.get("/price-list-shop", middlewareAuth, middlewareRole("shop"), controllerResourcePriceListShop);
routerResource.get("/price-list-user/:shopId", middlewareAuth, middlewareRole("user"), controllerResourcePriceListUser);
routerResource.patch("/price-activation/:priceId", middlewareAuth, middlewareRole("shop"), controllerResourcePriceActivation);

export default routerResource;