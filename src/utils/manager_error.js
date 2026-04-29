import validatorItem from "../validator/validator_item.js";
import validatorLength from "../validator/validator_length.js";
import validatorLoginUser from "../validator/validator_login.js";
import validatorRegistration from "../validator/validator_registration.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export const managerError = (object, key) => {
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
                const {recordId, otpRequestId, otpCode } = object;
                if (!recordId || !otpRequestId || !otpCode) {
                    generateError("Field missing", 400);
                }

                const otpRequestIdList = [
                    "registrationUser",
                    "verificationUser",
                    "resetPassword",
                    "changePhone",
                ]
                validatorItem(otpRequestId, otpRequestIdList, "Invalid request", 400);
                validatorLength(otpCode, process.env.OTP_LENGTH);
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
    // console.log("generate error", userError);
    throw userError;
}