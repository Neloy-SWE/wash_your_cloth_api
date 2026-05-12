import { sequelize } from "../config/database.js";
import User from "./model_user.js";
import Token from "./model_token.js";
import OTP from "./model_otp.js";
import Shop from "./model_shop.js";
import Service from "./model_service.js";
import Item from "./model_item.js";
import Price from "./model_price.js";
import Order from "./model_order.js";
import OrderItem from "./model_order_item.js";

User.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

User.hasMany(OTP, { foreignKey: "userId" });
OTP.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Shop, { foreignKey: "userId" });
Shop.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Item, { foreignKey: "userId" });
Item.belongsTo(User, { foreignKey: "userId" });

Service.hasMany(Price, { foreignKey: "serviceId" });
Price.belongsTo(Service, { foreignKey: "serviceId" });

Item.hasMany(Price, { foreignKey: "itemId" });
Price.belongsTo(Item, { foreignKey: "itemId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Shop.hasMany(Order, { foreignKey: "shopId" });
Order.belongsTo(Shop, { foreignKey: "shopId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

const db = {
    sequelize,
    User,
    Token,
    OTP,
    Shop,
    Service,
    Item,
    Price,
    Order,
    OrderItem,
}

export default db;