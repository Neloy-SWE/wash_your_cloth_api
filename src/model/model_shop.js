import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { generateError } from "../utils/manager_error.js";
import { DateTime } from "luxon";

const Shop = sequelize.define("Shop", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    shopName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 200],
                msg: "Shop name must be between 3 and 200 characters long",
            }
        }
    },
    openTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    closeTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    weekends: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: {
            msg: "User already owns a shop"
        },
    }
},
    {
        validate: {
            customValidator() {
                const open = DateTime.fromFormat(this.openTime, 'hh:mm a');
                const close = DateTime.fromFormat(this.closeTime, 'hh:mm a');
                if (close <= open) {
                    throw new Error("Closing time must be after opening time");
                }
            }
        }
    },
    {
        timestamps: true,
    }
);

export default Shop;