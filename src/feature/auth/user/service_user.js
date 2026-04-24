import db from "../../../model/index_model.js";
import { hashPassword } from "../../../utils/manager_password.js";
import validatorRegistrationUser from "../../../validator/validator_registration_user.js";

const serviceUser = async (
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

export default serviceUser;