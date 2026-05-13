import Joi from "joi";
import validatorOrderItem from "./validator_order_item.js";

const validatorOrder = Joi.object({
    shopId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            "string.guid": "Invalid shop ID format",
            "any.required": "Shop ID is required",
            "string.empty": "Shop ID cannot be empty",
        }),
    // totalPrice: Joi.number()
    //     .positive()
    //     .required()
    //     .messages({
    //         "number.base": "Total price must be a number",
    //         "number.positive": "Total price must be a positive value",
    //         "any.required": "Total price is required",
    //     }),
    note: Joi.string().min(0).max(500).messages({
        "string.max": "Note must be at most 500 characters long",
    }),
    items: Joi.array().items(validatorOrderItem).min(1).required().messages({
        "array.min": "At least one item must be added to the order",
        "any.required": "Items list is required",
        "array.base": "Please add item list",
    }),
});

export default validatorOrder;