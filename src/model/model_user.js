import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import validatorItem from "../validator/validator_item.js";
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
        unique: {
            msg: "This phone number is not available"
        },
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
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            customValidator(value) {
                const validListRole = ["user", "shop"];
                validatorItem(value, validListRole, "Invalid role", 400);
            }
        },
    }
},
    {
        timestamps: true,
    }
);

// User.beforeCreate(async (user) => {
//     const { password } = user;
//     const passwordHash = await hashPassword(password);
//     user.password = passwordHash;
// });

const hashUserPassword = async (user) => {
    if (user.changed("password")) {
        user.password = await hashPassword(user.password);
    }
};

User.beforeCreate(hashUserPassword);
// User.beforeUpdate(hashUserPassword);

export default User;