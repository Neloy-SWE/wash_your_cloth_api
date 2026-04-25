import validatorRegistration from "../../validator/validator_registration.js";
import { serviceAuthRegistration } from "./service_auth.js";

const controllerCreateUser = async (req, res, next) => {
    try {
        const { error } = validatorRegistration.validate(req.body);
        // console.error("validation error: ", error.details);

        if (error) {
            const errorUser = error.details;
            errorUser.statusCode = 400;
            next(errorUser);
        }

        const result = await serviceAuthRegistration(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}


export { controllerCreateUser };