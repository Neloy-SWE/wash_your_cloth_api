import Joi from "joi";

const validatorPrice = Joi.object({
    serviceId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            "string.guid": "Invalid Service ID format",
            "any.required": "Service ID is required",
            "string.empty": "Service ID cannot be empty",
        }),
    itemId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            "string.guid": "Invalid Item ID format",
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