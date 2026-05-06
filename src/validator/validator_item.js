import Joi from "joi";

const validatorItem = Joi.object({
    itemName: Joi.string().min(2).max(200).required().messages({
            "any.required": "Item name is required",
            "string.empty": "Item name cannot be empty",
            "string.min": "Item name must be at least 2 characters long",
            "string.max": "Item name must be at most 200 characters long",
        }),
});

export default validatorItem;