import { managerError } from "../../utils/manager_error.js";
import { serviceUserChangePassword, serviceUserChangePhone, serviceUserUpdateUser, serviceUserView } from "./service_user.js";

export const controllerUserChangePassword = async (req, res, next) => {
    try {
        managerError(req.body, "password");
        const result = await serviceUserChangePassword(req.body, req.user);
        res.status(result.statusCode).json(result.body);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerUserChangePhone = async (req, res, next) => {
    try {
        managerError(req.body, "phone");
        const result = await serviceUserChangePhone(req.body, req.user);
        res.status(result.statusCode).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerUserView = async (req, res, next) => {
    try {
        const result = await serviceUserView(req.user);
        res.status(200).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerUserUpdateUser = async (req, res, next) => {
    try {
        managerError(req.body, "updateUser");
        const result = await serviceUserUpdateUser(req.body, req.user);
        res.status(200).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}