import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import validatorLength from "../validator/validator_length.js";

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
                validatorLength(value);
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