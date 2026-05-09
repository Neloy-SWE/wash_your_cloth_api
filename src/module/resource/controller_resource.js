import { managerError } from "../../utils/manager_error.js";
import { serviceResourceActivation, serviceResourceItemAdd, serviceResourceItemList, serviceResourcePriceAdd, serviceResourcePriceListShop, serviceResourceServiceList } from "./service_resource.js";

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
        const result = await serviceResourceItemList(req.user.id);
        res.status(200).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourceItemActivation = async (req, res, next) => {
    try {
        managerError(req.params.itemId, "id");
        const result = await serviceResourceActivation(req.params.itemId);
        res.status(200).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourcePriceAdd = async (req, res, next) => {
    try {
        managerError(req.body, "price");
        const result = await serviceResourcePriceAdd(req.body, req.user.id);
        res.status(201).json(result);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourcePriceListShop = async (req, res, next) => {
    try {
        const result = await serviceResourcePriceListShop(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}