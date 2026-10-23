import { randomBytes } from "node:crypto";
import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";
import { getToken, hashRefreshToken } from "../../utils/manager_jwt_token.js";
import { comparePassword, hashPassword } from "../../utils/manager_password.js";
import { generateOTP, getOTPObject } from "../../utils/manager_otp.js";
import getExpirationTime from "../../utils/manager_time.js";
import { revokeSessions } from "../../config/socket.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export const serviceAuthRegistration = async (requestBody) => {
    const t = await db.sequelize.transaction();
    try {

        const { role, phone } = requestBody;

        const existingUser = await db.User.findOne({
            where: { phone },
        });
        if (existingUser) {
            generateError("This phone number is not available", 400);
        }

        let user;

        if (role === "user") {
            const { firstName, lastName, address, longitude, latitude, password } = requestBody;
            user = await db.User.create({
                firstName,
                lastName,
                address,
                phone,
                longitude,
                latitude,
                password,
                role,
            },
                {
                    transaction: t,
                }
            );
        } else if (role === "shop") {
            const { ownerFirstName, ownerLastName, shopAddress, longitude, latitude, password, shopName, openTime, closeTime, weekends } = requestBody;
            user = await db.User.create({
                firstName: ownerFirstName,
                lastName: ownerLastName,
                address: shopAddress,
                phone,
                longitude,
                latitude,
                password,
                role,
            },
                {
                    transaction: t,
                }
            );

            await db.Shop.create({
                shopName,
                openTime,
                closeTime,
                weekends,
                isActive: true,
                userId: user.id,
            },
                {
                    transaction: t,
                }
            );
        }



        const otpObject = getOTPObject(user.id, "verifyUser", "");
        const otp = await db.OTP.create(otpObject,
            {
                transaction: t,
            }
        );

        await t.commit();

        return {
            status: "unverified",
            otpRequestId: "verifyUser",
            message: "Registered! Enter OTP to continue",
            recordId: otp.id,
        };

    } catch (error) {
        await t.rollback();
        // console.log("service error", error);
        throw error;
    }

}

export const serviceAuthLogin = async ({
    phone,
    password,
    role,
    installationId,
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
            const result = await db.sequelize.transaction(async (transaction) => {
                await db.User.findByPk(user.id, {
                    transaction,
                    lock: transaction.LOCK.UPDATE,
                });
                const previousSessions = await db.Session.findAll({
                    where: {
                        installationId,
                        revokedAt: null,
                    },
                    attributes: ["id"],
                    transaction,
                    lock: transaction.LOCK.UPDATE,
                });
                const previousSessionIds = previousSessions.map((session) => session.id);
                if (previousSessionIds.length > 0) {
                    await db.Session.update(
                        { revokedAt: new Date() },
                        { where: { id: previousSessionIds }, transaction },
                    );
                }

                const now = new Date();
                const expiresAt = getExpirationTime(process.env.JWT_REFRESH_EXPIRE);
                const rawRefreshToken = randomBytes(64).toString("base64url");
                const refreshTokenHash = hashRefreshToken(rawRefreshToken);

                const session = await db.Session.create({
                    userId: user.id,
                    installationId,
                    expiresAt,
                    lastUsedAt: now,
                }, { transaction });
                await db.Token.create({
                    sessionId: session.id,
                    refreshTokenHash,
                    expirationRefreshToken: expiresAt,
                }, { transaction });

                const { token, expirationToken } = getToken({
                    id: user.id,
                    role: user.role,
                    sessionId: session.id,
                });
                return {
                    previousSessionIds,
                    body: {
                        status: "success",
                        message: "User login successful",
                        token,
                        refreshToken: rawRefreshToken,
                        expirationToken,
                        expirationRefreshToken: expiresAt,
                        role: user.role,
                    },
                };
            });
            revokeSessions(result.previousSessionIds);
            body = result.body;
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
    const refreshTokenHash = hashRefreshToken(refreshToken);
    const result = await db.sequelize.transaction(async (transaction) => {
        const storedToken = await db.Token.findOne({
            where: { refreshTokenHash },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        if (!storedToken) {
            return { error: "invalid refresh token" };
        }

        const session = await db.Session.findByPk(storedToken.sessionId, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        if (!session) {
            return { error: "invalid refresh token" };
        }

        if (storedToken.replacedAt) {
            session.revokedAt = new Date();
            await session.save({ transaction });
            return { error: "invalid refresh token", sessionId: session.id };
        }

        const now = new Date();
        if (session.revokedAt || session.expiresAt <= now
            || storedToken.expirationRefreshToken <= now) {
            return { error: "Session expired. Please login again" };
        }

        const user = await db.User.findByPk(session.userId, { transaction });
        if (!user) {
            return { error: "invalid refresh token" };
        }

        storedToken.replacedAt = now;
        await storedToken.save({ transaction });
        session.lastUsedAt = now;
        await session.save({ transaction });

        const rawRefreshToken = randomBytes(64).toString("base64url");
        await db.Token.create({
            sessionId: session.id,
            refreshTokenHash: hashRefreshToken(rawRefreshToken),
            expirationRefreshToken: session.expiresAt,
        }, { transaction });

        const { token, expirationToken } = getToken({
            id: user.id,
            role: user.role,
            sessionId: session.id,
        });
        return {
            body: {
                status: "success",
                message: "Token refresh successful",
                token,
                refreshToken: rawRefreshToken,
                expirationToken,
                expirationRefreshToken: session.expiresAt,
                role: user.role,
            },
            statusCode: 200,
        };
    });

    if (result.sessionId) {
        revokeSessions([result.sessionId]);
    }
    if (result.error) {
        generateError(result.error, 401);
    }
    return result;
};

export const serviceAuthLogout = async (userId, sessionId, allDevices) => {
    const sessionIds = await db.sequelize.transaction(async (transaction) => {
        await db.User.findByPk(userId, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        const where = allDevices
            ? { userId, revokedAt: null }
            : { id: sessionId, userId, revokedAt: null };
        const sessions = await db.Session.findAll({
            where,
            attributes: ["id"],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        const ids = sessions.map((session) => session.id);
        if (ids.length > 0) {
            await db.Session.update(
                { revokedAt: new Date() },
                {
                    where: { id: ids, revokedAt: null },
                    transaction,
                },
            );
        }
        return ids;
    });
    revokeSessions(sessionIds);
    return {
        status: "success",
        message: allDevices ? "Logged out from all devices" : "Logged out successfully",
    };
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
            else if (recordOTP.otpRequestId === otpRequestId && otpRequestId === "changePhone") {
                user.phone = recordOTP.metaData;
                body = {
                    status: "success",
                    message: "Phone changed successfully",
                }
            }
            await user.save();

            return {
                body,
                statusCode: 200,
            }
        }


    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}