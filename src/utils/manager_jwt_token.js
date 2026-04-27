import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import getExpirationDate from "./manager_time.js";
import { generateError } from "./manager_error.js";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export const generateToken = (payload) => {

    const { token, expirationToken } = getToken(payload);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
    const expirationRefreshToken = getExpirationDate(process.env.JWT_REFRESH_EXPIRE);

    return { token, refreshToken, expirationToken, expirationRefreshToken }
};

export const getToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    const expirationToken = getExpirationDate(process.env.JWT_EXPIRE);
    return { token, expirationToken }
};

export const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("payload", payload);
        return payload;
    } catch (error) {
        generateError("Invalid token", 400);
    }
};