import { generateError, managerError } from "../../utils/manager_error.js";
import { serviceAuthLogin, serviceAuthLogout, serviceAuthOTPVerify, serviceAuthRefreshToken, serviceAuthRegistration } from "./service_auth.js";

export const controllerAuthRegistration = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (role === "user") {
            managerError(req.body, "registrationUser");
        }
        else if (role === "shop") {
            managerError(req.body, "registrationShop");
        }
        else {
            generateError("Add a valid role", 400);
        }

        const result = await serviceAuthRegistration(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerAuthLogin = async (req, res, next) => {
    try {

        managerError(req.body, "login");

        const result = await serviceAuthLogin(req.body);
        res.status(result.statusCode).json(result.body);
    }
    catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerAuthRefreshToken = async (req, res, next) => {
    try {

        const { refreshToken } = req.body;
        if (!refreshToken) {
            generateError("Refresh token is required", 400);
        }

        const result = await serviceAuthRefreshToken(refreshToken);
        res.status(result.statusCode).json(result.body);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

export const controllerAuthLogout = async (req, res, next) => {
    try {
        const { allDevices = false } = req.body ?? {};
        if (typeof allDevices !== "boolean") {
            generateError("invalid information", 400);
        }
        const result = await serviceAuthLogout(
            req.user.id,
            req.sessionId,
            allDevices,
        );
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const controllerAuthOTPVerify = async (req, res, next) => {

    try {

        managerError(req.body, "otp");
        const result = await serviceAuthOTPVerify(req.body);
        res.status(result.statusCode).json(result.body);
    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}