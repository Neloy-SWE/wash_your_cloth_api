import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";
import { generateToken } from "../../utils/manager_jwt_token.js";
import { comparePassword } from "../../utils/manager_password.js";
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
        await db.User.create({
            firstName,
            lastName,
            address,
            phone,
            longitude,
            latitude,
            password,
            role,
        });

        return {
            status: "success",
            otprequestId: "registrationUser",
            message: "User registration successful",
        };

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }

}

const serviceAuthLogin = async ({
    phone,
    password,
    role,
}) => {
    try {

        const user = await db.User.findOne({ where: { phone } });
        if (!user) {
            generateError("Invalid information", 400);
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            generateError("Invalid information", 400);
        }

        if (user.role !== role) {
            generateError("Invalid information", 400);
        }

        let body;
        let statusCode;

        if (user.verified) {
            let { token, refreshToken, expirationToken, expirationRefreshToken } = generateToken({ id: user.id, role: user.role });

            await db.Token.create({
                token,
                expirationToken,
                refreshToken,
                expirationRefreshToken,
                userId: user.id,
            });

            body = {
                status: "success",
                message: "User login successful",
                token: token,
                refreshToken: refreshToken,
                expirationToken: expirationToken,
                expirationRefreshToken: expirationRefreshToken,
            };
            statusCode = 200;
        } else {
            body = {
                status: "unverified",
                otprequestId: "verificationUser",
                message: "User is not verified. Please verify your account.",
            };
            statusCode = 202;
        }
        return {
            body,
            statusCode,
        };
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

const serviceAuthOTP = async () => {

}

export { serviceAuthRegistration, serviceAuthLogin };