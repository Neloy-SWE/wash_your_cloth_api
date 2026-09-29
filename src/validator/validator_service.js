import Joi from "joi";

const validatorService = Joi.object({
    serviceName: Joi.string().regex(/^[A-Z]/).min(2).max(200).required().messages({
        "any.required": "Service name is required",
        "string.empty": "Service name cannot be empty",
        "string.min": "Service name must be at least 2 characters long",
        "string.max": "Service name must be at most 200 characters long",
        "string.pattern.base": '"{{#label}}" must start with an uppercase letter'
    }),
    description: Joi.string().min(2).max(1000).required().messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty",
        "string.min": "Description must be at least 2 characters long",
        "string.max": "Description must be at most 1000 characters long"
    }),
});

export default validatorService;