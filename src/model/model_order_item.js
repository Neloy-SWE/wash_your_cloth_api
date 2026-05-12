import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const OrderItem = sequelize.define("OrderItem", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 200],
                msg: "Service name must be between 2 and 200 characters long",
            }
        }
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 200],
                msg: "Item name must be between 2 and 200 characters long",
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unitPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    isIronPress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    ironPressPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
},
    {
        timestamps: true,
    }
);

export default OrderItem;