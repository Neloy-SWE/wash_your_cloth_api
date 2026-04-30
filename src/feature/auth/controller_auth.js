import { managerError } from "../../utils/manager_error.js";
import validatorItem from "../../validator/validator_item.js";
import validatorRegistration from "../../validator/validator_registration.js";
import { serviceAuthChangePassword, serviceAuthLogin, serviceAuthOTPVerify, serviceAuthRefreshToken, serviceAuthRegistration } from "./service_auth.js";

export const controllerAuthRegistration = async (req, res, next) => {
    try {

        managerError(req.body, "registration");

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

export const controllerAuthChangePassword = async (req, res, next) => {
    try {
        managerError(req.body, "password");
        const result = await serviceAuthChangePassword(req.body, req.user);
        res.status(result.statusCode).json(result.body);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}

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