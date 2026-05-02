import validatorItem from "../validator/validator_item.js";
import validatorLength from "../validator/validator_length.js";
import validatorLoginUser from "../validator/validator_login.js";
import validatorRegistration from "../validator/validator_registration.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import validatorChangePassword from "../validator/validator_change_password.js";
import validatorChangePhone from "../validator/validator_change_phone.js";
import validatorUpdateUser from "../validator/validator_update_user.js";
import validatorShop from "../validator/validator_shop.js";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export const managerError = (object, key) => {

    if (!object){
        generateError("Please provide information", 400);
    }

    let currentError;
    switch (key) {
        case "registration":
            {
                const { error } = validatorRegistration.validate(object);
                currentError = error;
                break;
            }
        case "login":
            {
                const { error } = validatorLoginUser.validate(object);
                currentError = error;
                break;
            }
        case "otp":
            {
                const { recordId, otpRequestId, otpCode } = object;
                if (!recordId || !otpRequestId || !otpCode) {
                    generateError("Field missing", 400);
                }

                const otpRequestIdList = [
                    "verifyUser",
                    "resetPassword",
                    "changePhone",
                ]
                validatorItem(otpRequestId, otpRequestIdList, "Invalid request", 400);
                validatorLength(otpCode, process.env.OTP_LENGTH);
                break;
            }
        case "password":
            {
                const { error } = validatorChangePassword.validate(object);
                currentError = error;
                break;
            }
        case "phone":
            {
                const { error } = validatorChangePhone.validate(object);
                currentError = error;
                break;
            }
        case "updateUser":
            {
                const { error } = validatorUpdateUser.validate(object);
                currentError = error;
                break;
            }
        case "shop":
            {
                const { error } = validatorShop.validate(object);
                currentError = error;
                break;
            }
    }
    if (currentError) {
        const userError = currentError.details;
        userError.statusCode = 400;
        throw userError;
    }
}

export const generateError = (message, statusCode) => {
    const error = new Error(message);
    const userError = [error];
    userError.statusCode = statusCode;
    console.log("generate error", userError);
    console.log("user error status code:::", userError.statusCode);
    console.log("parameter status code:::", statusCode);
    throw userError;
}