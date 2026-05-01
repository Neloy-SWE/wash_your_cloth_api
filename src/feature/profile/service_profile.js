import { generateError } from "../../utils/manager_error.js";
import { comparePassword, hashPassword } from "../../utils/manager_password.js";
import db from "../../model/index_model.js";
import { getOTPObject } from "../../utils/manager_otp.js";

export const serviceProfileChangePassword = async (requestBody, user) => {

    try {
        const { oldPassword, newPassword, confirmPassword } = requestBody;
        const { id, password } = user;
        const isOldPasswordCorrect = await comparePassword(oldPassword, password);
        if (!isOldPasswordCorrect) {
            generateError("Invalid request", 400);
        }

        await db.OTP.update(
            { isValid: false },
            {
                where: {
                    userId: id,
                    otpRequestId: "resetPassword",
                    isValid: true,
                }
            }
        );

        const newHashPassword = await hashPassword(newPassword);

        const otpObject = getOTPObject(id, "resetPassword", newHashPassword);
        const otp = await db.OTP.create(otpObject);

        const body = {
            status: "pendingPasswordChange",
            message: "Enter otp to confirm changes",
            otpRequestId: "resetPassword",
            recordId: otp.id,
        }

        return {
            body,
            statusCode: 200,
        }


    } catch (error) {
        // console.log("service error", error);
        throw error;
    }


}

export const serviceProfileChangePhone = async (requestBody, user) => {
    try {
        const { newPhone } = requestBody;
        const { id, phone } = user;

        const existingUser = await db.User.findOne({ where: { phone: newPhone } });

        if (existingUser) {
            generateError("This phone number is not available", 500);
        }

        await db.OTP.update(
            { isValid: false },
            {
                where: {
                    userId: id,
                    otpRequestId: "changePhone",
                    isValid: true,
                }
            }
        );

        const otpObject = getOTPObject(id, "changePhone", newPhone);
        const otp = await db.OTP.create(otpObject);

        const body = {
            status: "pendingPhoneChange",
            message: "Enter otp to confirm changes",
            otpRequestId: "changePhone",
            recordId: otp.id,
        }

        return {
            body,
            statusCode: 200,
        }

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }

}