import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const AppNotification = sequelize.define("AppNotification", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    navigation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    metaData: {
        type: DataTypes.STRING,
        allowNull: false,
    }

},
    {
        timestamps: true,
    }
);

export default AppNotification;