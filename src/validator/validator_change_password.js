import Joi from "joi";

const validatorChangePassword = Joi.object({
    oldPassword: Joi.string().required().messages(
        {
            "any.required": "Old password is required",
            "string.empty": "Old password cannot be empty",
        }),
    newPassword: Joi.string().invalid(Joi.ref("oldPassword")).min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]/).required().messages(
        {
            "string.pattern.base": "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "New password is required",
            "string.empty": "New password cannot be empty",
            "any.invalid": "New password must be different from old password",
            "string.min": "New password must be at least 8 characters long",
        }),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]/).required().messages(
        {
            "string.pattern.base": "Confirm password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Confirm password is required",
            "string.empty": "Confirm password cannot be empty",
            "any.only": "Confirm password must match new password",
            "string.min": "Confirm password must be at least 8 characters long",
        }),
});

export default validatorChangePassword;