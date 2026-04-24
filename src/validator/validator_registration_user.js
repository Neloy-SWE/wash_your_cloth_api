import Joi from "joi";


const validatorRegistrationUser = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    address: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]{11}$/).required().messages(
        {
            "string.pattern.base": "Phone number must be 11 digits",
            "any.required": "Phone number is required",
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
    role: Joi.string().valid("user", "shop").required(),
});

export default validatorRegistrationUser;