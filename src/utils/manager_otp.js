import getExpirationTime from "./manager_time.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export const generateOTP = () => {
    // return Math.floor(1000 + Math.random() * 9000).toString();
    return "1111";
}

export const getOTPObject = (userId, otpRequestId, metaData) => {
    const otp = generateOTP();
    const expirationTime = getExpirationTime(process.env.OTP_EXPIRE);
    // let metaData = null;
    // console.log(data);
    // if (otpRequestId === "resetPassword") {
    //     metaData = {
    //         newPassword: data,
    //     };

    // } else if (otpRequestId === "changePhone") {
    //     metaData = {
    //         newPhone: data,
    //     };
    // }
    return {
        userId,
        otp,
        expirationTime,
        otpRequestId,
        isUsed: false,
        metaData,
    }
}