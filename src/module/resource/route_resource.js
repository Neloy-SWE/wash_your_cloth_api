import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middlewareRole } from "../../middleware/middleware_role.js";
import { controllerResourceItemActivation, controllerResourceItemAdd, controllerResourceItemList, controllerResourceItemUpdate, controllerResourcePriceActivation, controllerResourcePriceAdd, controllerResourcePriceListShop, controllerResourcePriceListUser, controllerResourcePriceUpdate, controllerResourceServiceActivation, controllerResourceServiceAdd, controllerResourceServiceList, controllerResourceServiceUpdate } from "./controller_resource.js";

const routerResource = express.Router();

routerResource.post("/service-add", middlewareAuth, middlewareRole("shop"), controllerResourceServiceAdd);
routerResource.get("/service-list", middlewareAuth, middlewareRole("shop"), controllerResourceServiceList);
routerResource.patch("/service-update/:serviceId", middlewareAuth, middlewareRole("shop"), controllerResourceServiceUpdate);
routerResource.patch("/service-activation/:serviceId", middlewareAuth, middlewareRole("shop"), controllerResourceServiceActivation);
routerResource.post("/item-add", middlewareAuth, middlewareRole("shop"), controllerResourceItemAdd);
routerResource.get("/item-list", middlewareAuth, middlewareRole("shop"), controllerResourceItemList);
routerResource.patch("/item-update/:itemId", middlewareAuth, middlewareRole("shop"), controllerResourceItemUpdate);
routerResource.patch("/item-activation/:itemId", middlewareAuth, middlewareRole("shop"), controllerResourceItemActivation);
routerResource.post("/price-add", middlewareAuth, middlewareRole("shop"), controllerResourcePriceAdd);
routerResource.get("/price-list-shop", middlewareAuth, middlewareRole("shop"), controllerResourcePriceListShop);
routerResource.get("/price-list-user/:shopId", middlewareAuth, middlewareRole("user"), controllerResourcePriceListUser);
routerResource.patch("/price-activation/:priceId", middlewareAuth, middlewareRole("shop"), controllerResourcePriceActivation);
routerResource.patch("/price-update/:priceId", middlewareAuth, middlewareRole("shop"), controllerResourcePriceUpdate);

export default routerResource;