import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
    {
        timestamps: true,
    }
);

export default User;