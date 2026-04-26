import { managerError } from "../../utils/manager_error.js";
import validatorRegistration from "../../validator/validator_registration.js";
import { serviceAuthLogin, serviceAuthRegistration } from "./service_auth.js";

const controllerAuthRegistration = async (req, res, next) => {
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

const controllerLogin = async (req, res, next) => {
    try {

        managerError(req.body, "login");
        const result = await serviceAuthLogin(req.body);
        res.setHeader("security-token", result.token);



        res.status(result.statusCode).json(result.body);

    }
    catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}


export { controllerAuthRegistration, controllerLogin };