import db from "../../model/index_model.js";
import validatorRegistration from "../../validator/validator_registration.js";

const serviceAuthRegistration = async (
    {
        firstName,
        lastName,
        address,
        phone,
        longitude,
        latitude,
        password,
        role,
    }
) => {
    try {
        const result = await db.User.create({
            firstName,
            lastName,
            address,
            phone,
            longitude,
            latitude,
            password,
            role,
        });

        if (result) {
            return {
                status: "success",
                otprequestId: "registrationUser",
                message: "User registration successful",
            }
        }

        return result;
    } catch (error) {
        throw error;
    }

}

export { serviceAuthRegistration };