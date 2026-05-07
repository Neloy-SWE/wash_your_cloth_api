import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middleware_role } from "../../middleware/middleware_role.js";
import { controllerResourceItemActivation, controllerResourceItemAdd, controllerResourceItemList, controllerResourceServiceList } from "./controller_resource.js";

const routerResource = express.Router();

routerResource.get("/service-list", middlewareAuth, middleware_role("shop"), controllerResourceServiceList);
routerResource.post("/item-add", middlewareAuth, middleware_role("shop"), controllerResourceItemAdd);
routerResource.get("/item-list", middlewareAuth, middleware_role("shop"), controllerResourceItemList);
routerResource.patch("/item-activation/:itemId", middlewareAuth, middleware_role("shop"), controllerResourceItemActivation);

export default routerResource;