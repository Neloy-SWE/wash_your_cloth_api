import { managerError } from "../../utils/manager_error.js";
import { serviceResourceItemAdd, serviceResourceItemList, serviceResourceServiceList } from "./service_resource.js";

export const controllerResourceServiceList = async (req, res, next) => {
    try {
        const result = await serviceResourceServiceList();
        res.status(200).json(result);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourceItemAdd = async (req, res, next) => {
    try {
        managerError(req.body, "item");
        const result = await serviceResourceItemAdd(req.body, req.user);
        res.status(201).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourceItemList = async (req, res, next) => {
    try {
        const result = await serviceResourceItemList();
        res.status(200).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}