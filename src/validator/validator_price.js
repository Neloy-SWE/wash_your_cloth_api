import Joi from "joi";

const validatorPrice = Joi.object({
    serviceId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            "string.guid": "Invalid service ID format",
            "any.required": "Service ID is required",
            "string.empty": "Service ID cannot be empty",
        }),
    itemId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            "string.guid": "Invalid item ID format",
            "any.required": "Item ID is required",
            "string.empty": "Item ID cannot be empty",
        }),
    price: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be a positive value",
            "any.required": "Price is required",
        }),
    discountPrice: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Discount price must be a number",
            "number.min": "Iron press price cannot be negative",
            "any.required": "Discount price is required",
        }),
    ironPressPrice: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Iron press price must be a number",
            "number.min": "Iron press price cannot be negative",
            "any.required": "Iron press price is required",
        }),
});

export default validatorPrice;