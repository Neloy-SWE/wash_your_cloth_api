import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    trackingId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            len: {
                len: [0, 500],
                msg: "First name must be between 2 and 200 characters long",
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
    },
},
    {
        timestamps: true,
    }
);

export default Order;