import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Service = sequelize.define("Service", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 200],
                msg: "First name must be between 2 and 200 characters long",
            }
        }
    },
},
    {
        timestamps: true,
    }
)

export default Service;