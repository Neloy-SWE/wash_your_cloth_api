import { managerError } from "../../utils/manager_error.js";
import { serviceOrderPlace } from "./service_order.js";

export const controllerOrderPlace = async (req, res, next) => {
    try {
        managerError(req.body, "order");
        const result = await serviceOrderPlace(req.body, req.user);
        res.status(201).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}