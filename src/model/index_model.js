import { sequelize } from "../config/database.js";
import User from "./model_user.js";
import Token from "./model_token.js";
import OTP from "./model_otp.js";
import Shop from "./model_shop.js";

User.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

User.hasMany(OTP, { foreignKey: "userId" });
OTP.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Shop, { foreignKey: "userId" });
Shop.belongsTo(User, { foreignKey: "userId" });

const db = {
    sequelize,
    User,
    Token,
    OTP,
    Shop,
}

export default db;