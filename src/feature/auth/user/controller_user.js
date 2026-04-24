import e from "express";
import db from "../../../model/index_model.js";
import validatorRegistrationUser from "../../../validator/validator_registration_user.js";
import serviceUser from "./service_user.js";

const { User } = db;

const createUser = async (req, res, next) => {
    try {
        const { error } = validatorRegistrationUser.validate(req.body);
        // console.error("validation error: ", error.details);

        if (error) {
            const errorUser = error.details;
            errorUser.statusCode = 400;
            next(errorUser);
        }

        const result = await serviceUser(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}


export { createUser };