import { managerError } from "../../utils/manager_error.js";
import { serviceShopUpdate, serviceShopView } from "./service_shop.js";

// export const controllerShopOpen = async (req, res, next) => {
//     try {
//         managerError(req.body, "shop");
//         const result = await serviceShopOpen(req.body, req.user);
//         res.status(201).json(result);
//     } catch (error) {
//         // console.log("controller error", error);
//         next(error);
//     }
// }

export const controllerShopView = async (req, res, next) => {
    try {
        const result = await serviceShopView(req.user);
        res.status(200).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerShopUpdate = async (req, res, next) => {
    try {
        managerError(req.body, "updateShop");
        const result = await serviceShopUpdate(req.body, req.user);
        res.status(200).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}