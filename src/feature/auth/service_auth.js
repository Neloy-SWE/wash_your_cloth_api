import { Op } from "sequelize";
import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";
import { generateToken, getToken, verifyToken } from "../../utils/manager_jwt_token.js";
import { comparePassword, hashPassword } from "../../utils/manager_password.js";
import validatorRegistration from "../../validator/validator_registration.js";
import { generateOTP, getOTPObject } from "../../utils/manager_otp.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export const serviceAuthRegistration = async ({
    firstName,
    lastName,
    address,
    phone,
    longitude,
    latitude,
    password,
    role,
}) => {
    try {
        const user = await db.User.create({
            firstName,
            lastName,
            address,
            phone,
            longitude,
            latitude,
            password,
            role,
        });

        const otpObject = getOTPObject(user.id, "verifyUser", "");
        const otp = await db.OTP.create(otpObject);

        return {
            status: "unverified",
            otpRequestId: "verifyUser",
            message: "Registered! Enter OTP to continue",
            recordId: otp.id,
        };

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }

}

export const serviceAuthLogin = async ({
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
            const payload = { id: user.id, role: user.role };

            const existingToken = await db.Token.findOne({
                where: {
                    userId: user.id,
                    expirationRefreshToken: {
                        [Op.gt]: new Date(),
                    }
                },
                order: [['createdAt', 'DESC']],
            });

            if (existingToken) {
                const { token, expirationToken } = getToken(payload);
                // existingToken.token = token;
                // existingToken.expirationToken = expirationToken;
                // await existingToken.save();

                body = {
                    status: "success",
                    message: "User login successful",
                    token: token,
                    refreshToken: existingToken.refreshToken,
                    expirationToken: expirationToken,
                    expirationRefreshToken: existingToken.expirationRefreshToken,
                };
            }
            else {
                let { token, refreshToken, expirationToken, expirationRefreshToken } = generateToken(payload);

                await db.Token.create({
                    // token,
                    // expirationToken,
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
            }
            statusCode = 200;
        } else {

            await db.OTP.update(
                { isValid: false },
                {
                    where: {
                        userId: user.id,
                        otpRequestId: "verifyUser",
                        isValid: true,
                    }
                }
            );

            const otpObject = getOTPObject(user.id, "verifyUser", "");
            const otp = await db.OTP.create(otpObject);

            body = {
                status: "unverified",
                message: "Enter OTP to get full access",
                otpRequestId: "verifyUser",
                recordId: otp.id,
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

export const serviceAuthRefreshToken = async (refreshToken) => {
    try {
        const payload = verifyToken(refreshToken);
        const existingToken = await db.Token.findOne({
            where: {
                userId: payload.id,
                expirationRefreshToken: {
                    [Op.gt]: new Date(),
                }
            },
            order: [['createdAt', 'DESC']],
        });

        if (refreshToken !== existingToken?.refreshToken) {
            generateError("Invalid token", 400);
        }

        let body;
        let statusCode;

        if (existingToken) {
            const { token, expirationToken } = getToken({ id: payload.id, role: payload.role });
            // existingToken.token = token;
            // existingToken.expirationToken = expirationToken;
            // await existingToken.save();

            body = {
                status: "success",
                message: "token refresh successful",
                token: token,
                refreshToken: existingToken.refreshToken,
                expirationToken: expirationToken,
                expirationRefreshToken: existingToken.expirationRefreshToken,
            };
            statusCode = 200;
        }
        else {
            body = {
                status: "sessionExpired",
                message: "Session expired. Please login again",
            }
            statusCode = 401;
        }

        return {
            body,
            statusCode,
        }

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceAuthOTPVerify = async ({
    recordId,
    otpRequestId,
    otpCode,
}) => {
    try {

        const recordOTP = await db.OTP.findOne({ where: { id: recordId, otpRequestId } });
        if (!recordOTP) {
            generateError("Invalid information", 400);
        }
        if (recordOTP.attempts >= process.env.OTP_MAX_ATTEMPTS) {
            generateError("Too many attempts", 400);
        }
        if (recordOTP.expirationTime < new Date() || recordOTP.isUsed || recordOTP.otp !== otpCode || !recordOTP.isValid) {
            recordOTP.attempts += 1;
            await recordOTP.save();
            generateError("Invalid OTP", 400);
        }
        else if (recordOTP.otp === otpCode) {
            recordOTP.isUsed = true;
            recordOTP.isValid = false;
            recordOTP.attempts += 1;
            await recordOTP.save();

            let body;
            const user = await db.User.findOne({ where: { id: recordOTP.userId } });
            if (recordOTP.otpRequestId === otpRequestId && otpRequestId === "verifyUser") {
                user.verified = true;
                body = {
                    status: "success",
                    message: "User verified and have full access now",
                }
            }
            else if (recordOTP.otpRequestId === otpRequestId && otpRequestId === "resetPassword") {
                user.password = recordOTP.metaData;
                body = {
                    status: "success",
                    message: "Password changed successfully",
                }
             }
            else if (recordOTP.otpRequestId === otpRequestId && otpRequestId === "changePhone") {/** todo: implement change phone logic*/ }
            await user.save();

            return {
                body,
                statusCode: 200,
            }
        }


    } catch (error) {
        console.log("service error", error);
        throw error;
    }
}