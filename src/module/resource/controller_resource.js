import { serviceResourceServiceList } from "./service_resource.js";

export const controllerResourceServiceList = async (req, res, next) => {
    try {
        const result = await serviceResourceServiceList();
        res.status(200).json(result);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}