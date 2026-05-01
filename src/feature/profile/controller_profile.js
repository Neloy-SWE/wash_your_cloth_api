import { managerError } from "../../utils/manager_error.js";
import { serviceProfileChangePassword, serviceProfileChangePhone, serviceProfileView } from "./service_profile.js";

export const controllerProfileChangePassword = async (req, res, next) => {
    try {
        managerError(req.body, "password");
        const result = await serviceProfileChangePassword(req.body, req.user);
        res.status(result.statusCode).json(result.body);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerProfileChangePhone = async (req, res, next) => {
    try {
        managerError(req.body, "phone");
        const result = await serviceProfileChangePhone(req.body, req.user);
        res.status(result.statusCode).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerProfileView = async (req, res, next) => {
    try {
        const result = await serviceProfileView(req.user);
        res.status(200).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}