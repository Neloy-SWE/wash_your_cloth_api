import Joi from "joi";

const validatorItem = Joi.object({
    itemName: Joi.string().regex(/^[A-Z]/).min(2).max(200).required().messages({
        "any.required": "Item name is required",
        "string.empty": "Item name cannot be empty",
        "string.min": "Item name must be at least 2 characters long",
        "string.max": "Item name must be at most 200 characters long",
        "string.pattern.base": '"{{#label}}" must start with an uppercase letter'
    }),
});

export default validatorItem;