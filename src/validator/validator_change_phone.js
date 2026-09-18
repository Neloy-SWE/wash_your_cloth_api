import Joi from "joi";

const validatorChangePhone = Joi.object({
    oldPhone: Joi.string().pattern(/^[0-9]{11}$/).required().messages(
        {
            "string.pattern.base": "Old phone number must be 11 digits",
            "any.required": "Old phone number is required",
            "string.empty": "Old phone number cannot be empty",
        }),
    newPhone: Joi.string().invalid(Joi.ref("oldPhone")).pattern(/^[0-9]{11}$/).required().messages(
        {
            "string.pattern.base": "New phone number must be 11 digits",
            "any.invalid": "New phone number cannot be the same as the old phone number",
            "any.required": "New phone number is required",
            "string.empty": "New phone number cannot be empty",
        }),
});

export default validatorChangePhone;