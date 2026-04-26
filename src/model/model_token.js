import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../config/database.js";

const Token = sequelize.define("Token", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationToken: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationRefreshToken: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    {
        timestamps: true,
    }
);

export default Token;