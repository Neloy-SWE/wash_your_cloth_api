import Joi from "joi";

const validatorOrderItem = Joi.object({
    serviceName: Joi.string().min(2).max(200).required().messages({
        "any.required": "Service name is required",
        "string.empty": "Service name cannot be empty",
        "string.min": "Service name must be at least 2 characters long",
        "string.max": "Service name must be at most 200 characters long",
    }),
    itemName: Joi.string().min(2).max(200).required().messages({
        "any.required": "Item name is required",
        "string.empty": "Item name cannot be empty",
        "string.min": "Item name must be at least 2 characters long",
        "string.max": "Item name must be at most 200 characters long",
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number",
        "number.min": "Quantity must be at least 1",
        "number.integer": "Quantity must be integer",
        "any.required": "Quantity is required",
    }),
    unitPrice: Joi.number().min(0).required().messages({
        "number.base": "Unit price must be a number",
        "number.min": "Unit press price cannot be negative",
        "any.required": "Unit price is required",
    }),
    isIronPress: Joi.boolean().required().messages({
        "boolean.base": "Iron press selection must be either true or false",
        "any.required": "Please specify if iron press service is required",
    }),
    ironPressPrice: Joi.number().min(0).required().messages({
        "number.base": "Iron press price must be a number",
        "number.min": "Iron press press price cannot be negative",
        "any.required": "Iron press price is required",
    }),
    totalPrice: Joi.number().min(0).required()
});

export default validatorOrderItem;