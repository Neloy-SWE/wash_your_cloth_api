import { sequelize } from "../config/database.js";
import User from "./model_user.js";

const db = {
    sequelize,
    User,
}

export default db;