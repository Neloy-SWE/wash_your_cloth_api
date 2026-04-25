import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import validatorRole from "../validator/validator_role.js";
import { hashPassword } from "../utils/manager_password.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 200],
                msg: "First name must be between 2 and 200 characters long",
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 200],
                msg: "Last name must be between 2 and 200 characters long",
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^[0-9]{11}$/,
        },
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
    },
    role : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
           customValidator(value) {
                validatorRole(value);
           }
        },
    }
},
    {
        timestamps: true,
    }
);

User.beforeCreate(async (user) => {
    const { password } = user;
    const passwordHash = await hashPassword(password);
    user.password = passwordHash;
});

export default User;