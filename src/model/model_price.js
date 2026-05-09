import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Price = sequelize.define("Price", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    ironPressPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
},
    {
        timestamps: true,
    }
)

export default Price;