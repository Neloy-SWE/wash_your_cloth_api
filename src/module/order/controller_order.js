import { managerError } from "../../utils/manager_error.js";
import { serviceOrderDetails, serviceOrderList, serviceOrderPlace } from "./service_order.js";

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

export const controllerOrderListUser = async (req, res, next) => {
    try {
        const result = await serviceOrderList(req.user.id, req.role);
        res.status(200).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerOrderListShop = async (req, res, next) => {
    try {
        managerError(req.params.shopId, "id");
        const result = await serviceOrderList(req.params.shopId, req.role, req.user.id);
        res.status(200).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerOrderDetailsUser = async (req, res, next) => {
    try {
        managerError(req.params.orderId, "id");
        const result = await serviceOrderDetails(req.params.orderId, req.user.id);
        res.status(200).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}