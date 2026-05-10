import { managerError } from "../../utils/manager_error.js";
import { serviceResourceItemActivation, serviceResourceItemAdd, serviceResourceItemList, serviceResourcePriceActivation, serviceResourcePriceAdd, serviceResourcePriceList, serviceResourcePriceUpate, serviceResourceServiceList } from "./service_resource.js";

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
        const result = await serviceResourceItemActivation(req.params.itemId, req.user.id);
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
        const result = await serviceResourcePriceList(req.user.id, req.role);
        res.status(200).json(result);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourcePriceListUser = async (req, res, next) => {
    try {
        managerError(req.params.shopId, "id");
        const result = await serviceResourcePriceList(req.params.shopId, req.role);
        res.status(200).json(result);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourcePriceActivation = async (req, res, next) => {
    try {
        managerError(req.params.priceId, "id");
        const result = await serviceResourcePriceActivation(req.params.priceId, req.user.id);
        res.status(200).json(result);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerResourcePriceUpdate = async (req, res, next) => {
    try {
        managerError(req.params.priceId, "id");
        managerError(req.body, "updatePrice");
        const result = await serviceResourcePriceUpate(req.body, req.params.priceId, req.user.id);
        res.status(200).json(result);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}