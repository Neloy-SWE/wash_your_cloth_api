import getExpirationTime from "./manager_time.js";

export const generateOTP = () => {
    // return Math.floor(1000 + Math.random() * 9000).toString();
    return "1111";
}

export const getOTPObject = (userId, otpRequestId, metaData) => {
    const otp = generateOTP();
    const expirationTime = getExpirationTime("3m");
    return {
        userId,
        otp,
        expirationTime,
        otpRequestId,
        isUsed: false,
        metaData,
    }
}