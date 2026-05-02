import Joi from "joi";
import { DateTime } from "luxon";

const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/i;

const validatorShop = Joi.object({
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

export default validatorShop;