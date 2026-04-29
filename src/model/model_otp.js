import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import validatorLength from "../validator/validator_length.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const OTP = sequelize.define("OTP", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            customValidator(value) {
                validatorLength(value, process.env.OTP_LENGTH);
            }
        },
    },
    expirationTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    otpRequestId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    resendCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    resendAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    metaData: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        timestamps: true
    }
);

export default OTP;