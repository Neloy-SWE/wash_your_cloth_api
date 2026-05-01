import Joi from "joi";

const validatorUpdateUser = Joi.object({
    firstName: Joi.string().min(2).max(200).required().messages({
        "any.required": "First name is required",
        "string.empty": "First name cannot be empty",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name must be at most 200 characters long",
    }),
    lastName: Joi.string().min(2).max(200).required().messages({
        "any.required": "Last name is required",
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name must be at most 200 characters long",
    }),
    address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
    }),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
});

export default validatorUpdateUser;