import validatorLoginUser from "../validator/validator_login.js";
import validatorRegistration from "../validator/validator_registration.js";

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