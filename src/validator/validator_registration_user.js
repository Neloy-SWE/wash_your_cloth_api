import Joi from "joi";


const validatorRegistrationUser = Joi.object({
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
    phone: Joi.string().pattern(/^[0-9]{11}$/).required().messages(
        {
            "string.pattern.base": "Phone number must be 11 digits",
            "any.required": "Phone number is required",
            "string.empty": "Phone number cannot be empty",
        }),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]/).required().messages(
        {
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 8 characters long",
        }),
    role: Joi.string().valid("user", "shop").required().messages({
        "any.required": "Role is required",
        "string.valid": "Role must be either 'user' or 'shop'",
        "string.empty": "Role cannot be empty",
    }),
});

export default validatorRegistrationUser;