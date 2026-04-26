import Joi from "joi";

const validatorLoginUser = Joi.object({
    phone: Joi.string().pattern(/^[0-9]{11}$/).required().messages(
        {
            "string.pattern.base": "Phone number must be 11 digits",
            "any.required": "Phone number is required",
            "string.empty": "Phone number cannot be empty",
        }),
    password: Joi.string().required().messages(
        {
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
        }),
    role: Joi.string().valid("user", "shop").required().messages({
        "any.required": "Role is required",
        "string.valid": "Role must be either 'user' or 'shop'",
        "string.empty": "Role cannot be empty",
    }),
});

export default validatorLoginUser;