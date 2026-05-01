import Joi from "joi";

const validatorChangePhone = Joi.object({
    newPhone: Joi.string().pattern(/^[0-9]{11}$/).required().messages(
        {
            "string.pattern.base": "New phone number must be 11 digits",
            "any.required": "New phone number is required",
            "string.empty": "New phone number cannot be empty",
        }),
});

export default validatorChangePhone;