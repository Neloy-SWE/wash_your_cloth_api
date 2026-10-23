import { sequelize } from "../config/database.js";
import User from "./model_user.js";
import Token from "./model_token.js";
import Session from "./model_session.js";
import OTP from "./model_otp.js";
import Shop from "./model_shop.js";
import Service from "./model_service.js";
import Item from "./model_item.js";
import Price from "./model_price.js";
import Order from "./model_order.js";
import OrderItem from "./model_order_item.js";
import AppNotification from "./model_app_notification.js";

User.hasMany(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

Session.hasMany(Token, { foreignKey: "sessionId" });
Token.belongsTo(Session, { foreignKey: "sessionId" });

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

User.hasMany(Service, { foreignKey: "userId" });
Service.belongsTo(User, { foreignKey: "userId" });

User.hasMany(AppNotification, { foreignKey: "userId" });
AppNotification.belongsTo(User, { foreignKey: "userId" });

const db = {
    sequelize,
    User,
    Token,
    Session,
    OTP,
    Shop,
    Service,
    Item,
    Price,
    Order,
    OrderItem,
    AppNotification,
}

export default db;