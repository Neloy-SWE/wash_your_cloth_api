import { col } from "sequelize";
import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";
import managerOrderPrice from "../../utils/manager_order_price.js";
import managerTrakingId from "../../utils/manager_tracking_id.js";

export const serviceOrderPlace = async (requestBody, user) => {
    const t = await db.sequelize.transaction();

    try {
        const { shopId, note, items } = requestBody;

        const trackingId = managerTrakingId();

        const { itemsWithTotalPrice, totalPriceOrder } = managerOrderPrice(items);

        const newOrder = await db.Order.create({
            trackingId,
            shopId,
            note,
            userId: user.id,
            trackingId,
            totalPrice: totalPriceOrder,
            OrderItems: itemsWithTotalPrice,
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
            ]
        },);

        return orderList;

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceOrderDetails = async (orderId, userId) => {
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
                    attributes: ["serviceName", "itemName", "quantity", "unitPrice", "totalPrice"]
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