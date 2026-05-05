import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middleware_role } from "../../middleware/middleware_role.js";
import { controllerResourceServiceList } from "./controller_resource.js";

const routerResource = express.Router();

routerResource.get("/service-list", middlewareAuth, middleware_role("shop"), controllerResourceServiceList)

export default routerResource;