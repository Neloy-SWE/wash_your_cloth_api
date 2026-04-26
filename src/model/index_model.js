import { sequelize } from "../config/database.js";
import User from "./model_user.js";
import Token from "./model_token.js";

User.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

const db = {
    sequelize,
    User,
    Token,
}

export default db;