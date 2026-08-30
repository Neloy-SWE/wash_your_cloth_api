import { col } from "sequelize";
import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";
import managerOrderPrice from "../../utils/manager_order_price.js";
import managerTrakingId from "../../utils/manager_tracking_id.js";
import validatorEntry from "../../validator/validator_entry.js";

export const serviceOrderPlace = async (requestBody, user) => {
    const t = await db.sequelize.transaction();

    try {
        const { shopId, note, items } = requestBody;

        const shop = await db.Shop.findByPk(shopId, { transaction: t });
        if (!shop) {
            generateError("Invalid request", 400);
        }
        const deliveryCharge = Number(shop.deliveryCharge || 0);

        const priceIdList = [...new Set(items.map((item) => item.priceId))];
        const priceList = await db.Price.findAll({
            where: {
                id: priceIdList,
                isActive: true,
            },
            include: [
                { model: db.Service, attributes: ["name"] },
                { model: db.Item, attributes: ["name"] },
            ],
            transaction: t,
        });
        if (priceList.length !== priceIdList.length) {
            generateError("Invalid request", 400);
        }

        const trackingId = managerTrakingId();

        const { itemsWithTotalPrice, subtotalOrder } = managerOrderPrice(items, priceList);

        const totalPriceOrder = subtotalOrder + deliveryCharge;

        const newOrder = await db.Order.create({
            trackingId,
            shopId,
            note,
            userId: user.id,
            trackingId,
            totalPrice: totalPriceOrder,
            OrderItems: itemsWithTotalPrice,
            deliveryCharge: deliveryCharge,
        },
            {
                include: [{
                    model: db.OrderItem
                }],
                t,
            });

        await t.commit();

        return {
            status: "success",
            message: "Your order is placed",
        }

    } catch (error) {
        await t.rollback();
        // console.log("service error", error);
        throw error;
    }
}

export const serviceOrderList = async (keyId, role, userId) => {

    try {
        let mainCondition;

        if (role === "shop") {
            const shop = await db.Shop.findByPk(keyId);
            if (!shop || shop.userId !== userId) {
                generateError("Wrong shop", 400);
            }
            mainCondition = {
                shopId: keyId,
                isActive: true,
            };
        } else if (role === "user") {
            mainCondition = {
                userId: keyId,
                isActive: true,
            };
        }

        const orderList = await db.Order.findAll({
            where: mainCondition,
            attributes: [
                "id",
                "trackingId",
                "totalPrice",
                "status",
            ],
            order: [['createdAt', 'DESC']],
        },);

        return orderList;

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceOrderDetailsUser = async (orderId, userId) => {
    try {
        const order = await db.Order.findOne({
            where: {
                id: orderId,
                userId
            },
            attributes: [
                "id",
                "trackingId",
                "status",
                "totalPrice",
                "deliveryCharge",
                "note",
                [col("Shop.shopName"), "shopName"],
                [col("Shop->User.firstName"), "ownerFirstName"],
                [col("Shop->User.lastName"), "ownerLastName"],
                [col("Shop->User.address"), "shopAddress"],
                [col("Shop->User.phone"), "shopPhone"],
            ],
            include: [
                {
                    model: db.Shop,
                    attributes: [],
                    include: [{
                        model: db.User,
                        attributes: [],
                    }],
                },
                {
                    model: db.OrderItem,
                    attributes: ["id", "serviceName", "itemName", "quantity", "unitPrice", "isIronPress", "ironPressPrice", "totalPrice"]
                }
            ],
        });
        if (!order) {
            generateError("Wrong order", 400);
        }

        return order;
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceOrderDetailsShop = async (orderId, userId) => {
    try {
        const shop = await db.Shop.findOne({
            where: {
                userId,
            },
        });

        if (!shop) {
            generateError("Wrong shop", 400);
        }

        const order = await db.Order.findOne({
            where: {
                id: orderId,
                shopId: shop.id,
            },
            attributes: [
                "trackingId",
                "status",
                "totalPrice",
                "deliveryCharge",
                "note",
                [col("User.firstName"), "userFirstName"],
                [col("User.lastName"), "userLastName"],
                [col("User.address"), "userAddress"],
                [col("User.phone"), "userPhone"],
            ],
            include: [
                {
                    model: db.User,
                    attributes: [],
                },
                {
                    model: db.OrderItem,
                    attributes: ["id", "serviceName", "itemName", "quantity", "unitPrice", "isIronPress", "ironPressPrice", "totalPrice"]
                }
            ],
        });
        if (!order) {
            generateError("Wrong order", 400);
        }

        return order;
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceOrderDeactive = async (orderId, userId) => {
    /**
     * this api will simply deactive the order.
     * but user will be notified that the order is deleted. 
     */
    try {
        const order = await db.Order.findOne({
            where: {
                id: orderId,
                userId,
                isActive: true,
            }
        });
        if (!order) {
            generateError("Wrong order", 400);
        }

        validatorEntry(order.status, ["pending", "rejected"], "order already processing", 400);

        order.isActive = false;
        await order.save();

        return {
            status: "success",
            message: "Order deleted",
        }

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}