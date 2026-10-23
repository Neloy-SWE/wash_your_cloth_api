import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Token = sequelize.define("Token", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    // token: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // expirationToken: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // },
    refreshTokenHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    expirationRefreshToken: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    replacedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
    {
        timestamps: true,
    }
);

export default Token;