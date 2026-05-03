import Joi from "joi";
import { DateTime } from "luxon";

const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/i;

const validatorRegistrationShop = Joi.object({
    ownerFirstName: Joi.string().min(2).max(200).required().messages({
        "any.required": "First name is required",
        "string.empty": "First name cannot be empty",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name must be at most 200 characters long",
    }),
    ownerLastName: Joi.string().min(2).max(200).required().messages({
        "any.required": "Last name is required",
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name must be at most 200 characters long",
    }),
    shopAddress: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
    }),
    phone: Joi.string().pattern(/^[0-9]{11}$/).required().messages(
        {
            "string.pattern.base": "Phone number must be 11 digits",
            "any.required": "Phone number is required",
            "string.empty": "Phone number cannot be empty",
        }),
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]/).required().messages(
        {
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 8 characters long",
        }),
    role: Joi.string().valid("user", "shop").required().messages({
        "any.required": "Role is required",
        "string.valid": "Role must be either 'user' or 'shop'",
        "string.empty": "Role cannot be empty",
    }),
    shopName: Joi.string().min(3).max(200).required().messages({
        "any.required": "Shop name is required",
        "string.empty": "Shop name cannot be empty",
        "string.min": "Shop name must be at least 3 characters long",
        "string.max": "Shop name must be at most 200 characters long",
    }),
    openTime: Joi.string()
        .regex(timeRegex)
        .required()
        .messages({
            "string.pattern.base": "Incorrect time format",
            "any.required": "Open time is required",
            "string.empty": "Open time cannot be empty",
        }),

    closeTime: Joi.string()
        .regex(timeRegex)
        .required()
        .messages({
            "string.pattern.base": "Incorrect time format",
            "any.required": "Close time is required",
            "string.empty": "Close time cannot be empty",
        }),
    weekends: Joi.string()
        .custom((value, helpers) => {
            const days = value.split(',').map(s => s.trim());

            const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            for (let day of days) {
                if (!validDays.includes(day)) {
                    // Triggers the custom message for invalid days
                    return helpers.message('One or more of the provided days are invalid');
                }
            }
            return value;
        })
        .required()
        .messages({
            "string.empty": "Weekends string cannot be empty",
            "any.required": "Weekends field is required",
        })


})
    .custom((obj, helpers) => {
        const openTimeIn24Format = DateTime.fromFormat(obj.openTime, 'hh:mm a').toFormat('HHmm');
        const closeTimeIn24Format = DateTime.fromFormat(obj.closeTime, 'hh:mm a').toFormat('HHmm');

        if (parseInt(closeTimeIn24Format) <= parseInt(openTimeIn24Format)) {
            return helpers.message("Closing time must be after opening time");
        }
        return obj;
    });

export default validatorRegistrationShop;