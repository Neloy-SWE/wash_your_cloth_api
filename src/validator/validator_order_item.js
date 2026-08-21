import Joi from "joi";

const validatorOrderItem = Joi.object({
    priceId: Joi.string()
        .guid({ version: "uuidv4" })
        .required()
        .messages({
            "string.guid": "Invalid price ID format",
            "any.required": "Price ID is required",
            "string.empty": "Price ID cannot be empty",
        }),
    quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number",
        "number.min": "Quantity must be at least 1",
        "number.integer": "Quantity must be an integer",
        "any.required": "Quantity is required",
    }),
    isIronPress: Joi.boolean().required().messages({
        "boolean.base": "Iron press selection must be true or false",
        "any.required": "Please specify if iron press service is required",
    }),
});

export default validatorOrderItem;