import { col } from "sequelize";
import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";
import managerOrderPrice from "../../utils/manager_order_price.js";
import managerTrakingId from "../../utils/manager_tracking_id.js";
import validatorEntry from "../../validator/validator_entry.js";
import { createAppNotification, publishAppNotification } from "../notification/service_notification.js";

export const serviceOrderPlace = async (requestBody, user) => {
    let notification;
    const { shopId, note, items } = requestBody;

    const newOrder = await db.sequelize.transaction(async (transaction) => {
        const shop = await db.Shop.findByPk(shopId, { transaction });
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
                { model: db.Service, attributes: ["name", "description"] },
                { model: db.Item, attributes: ["name"] },
            ],
            transaction,
        });
        if (priceList.length !== priceIdList.length) {
            generateError("Invalid request", 400);
        }

        const trackingId = managerTrakingId();
        const { itemsWithTotalPrice, subtotalOrder } = managerOrderPrice(items, priceList);
        const totalPriceOrder = subtotalOrder + deliveryCharge;

        const order = await db.Order.create({
            trackingId,
            shopId,
            note,
            userId: user.id,
            totalPrice: totalPriceOrder,
            OrderItems: itemsWithTotalPrice,
            deliveryCharge,
        }, {
            include: [{ model: db.OrderItem }],
            transaction,
        });

        notification = await createAppNotification({
            userId: shop.userId,
            title: "New order",
            message: `A customer placed order ${trackingId}.`,
            navigation: "orderDetails",
            metaData: order.id,
            transaction,
        });
        return order;
    });

    publishAppNotification(notification);
    return {
        status: "success",
        message: "Your order is placed",
    }
}

const orderStatusTransitions = {
    accepted: {
        role: "shop",
        from: "pending",
        title: "Order accepted",
        message: (trackingId) => `Your order ${trackingId} has been accepted.`,
    },
    rejected: {
        role: "shop",
        from: "pending",
        title: "Order rejected",
        message: (trackingId) => `Your order ${trackingId} has been rejected.`,
    },
    ready: {
        role: "shop",
        from: "accepted",
        title: "Order ready",
        message: (trackingId) => `Your order ${trackingId} is ready.`,
    },
    handoverRequest: {
        role: "shop",
        from: "ready",
        title: "Confirm order received",
        message: (trackingId) => `Please confirm receipt of order ${trackingId}.`,
    },
    received: {
        role: "user",
        from: "handoverRequest",
        title: "Order received",
        message: (trackingId) => `The customer confirmed receipt of order ${trackingId}.`,
    },
};

export const serviceOrderUpdateStatus = async (orderId, userId, nextStatus) => {
    const transition = orderStatusTransitions[nextStatus];
    if (!transition) {
        generateError("Invalid order status", 400);
    }

    let notification;
    const order = await db.sequelize.transaction(async (transaction) => {
        let where;
        let recipientId;

        if (transition.role === "shop") {
            const shop = await db.Shop.findOne({
                where: { userId },
                transaction,
            });
            if (!shop) {
                generateError("Wrong shop", 400);
            }
            where = { shopId: shop.id };
        } else {
            where = { userId };
        }

        const currentOrder = await db.Order.findOne({
            where: { ...where, id: orderId, isActive: true },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        if (!currentOrder) {
            generateError("Wrong order", 400);
        }
        validatorEntry(currentOrder.status, [transition.from], "Order status cannot be changed", 400);

        currentOrder.status = nextStatus;
        await currentOrder.save({ transaction });

        if (transition.role === "shop") {
            recipientId = currentOrder.userId;
        } else {
            const shop = await db.Shop.findByPk(currentOrder.shopId, { transaction });
            if (!shop) {
                generateError("Wrong shop", 400);
            }
            recipientId = shop.userId;
        }

        notification = await createAppNotification({
            userId: recipientId,
            title: transition.title,
            message: transition.message(currentOrder.trackingId),
            navigation: "orderDetails",
            metaData: currentOrder.id,
            transaction,
        });
        return currentOrder;
    });

    publishAppNotification(notification);
    return {
        status: "success",
        message: `Order ${nextStatus}`,
    };
}

export const serviceOrderList = async (userId, role) => {

    try {
        let mainCondition;

        if (role === "shop") {
            const shop = await db.Shop.findOne({
                where: {
                    userId
                }
            });
            if (!shop) {
                generateError("Wrong shop", 400);
            }
            mainCondition = {
                shopId: shop.id,
                isActive: true,
            };
        } else if (role === "user") {
            mainCondition = {
                userId: userId,
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
                    attributes: ["id", "serviceName", "itemName", "description", "quantity", "unitPrice", "isIronPress", "ironPressPrice", "totalPrice"]
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
                "id",
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
                    attributes: ["id", "serviceName", "itemName", "description", "quantity", "unitPrice", "isIronPress", "ironPressPrice", "totalPrice"]
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