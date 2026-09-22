import { col } from "sequelize";
import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";
import { DateTime } from "luxon";

// export const serviceShopOpen = async (requestBody, user) => {
//     try {

//         const existingShop = await db.Shop.findOne({
//             where: {
//                 userId: user.id
//             }
//         });
//         if (existingShop) {
//             generateError("User already owns a shop", 400);
//         }

//         const { shopName, openTime, closeTime, weekends } = requestBody;
//         const shop = await db.Shop.create({
//             shopName,
//             openTime,
//             closeTime,
//             weekends,
//             isActive: true,
//             userId: user.id,
//         });
//         return {
//             status: "success",
//             message: "welcome to the shop",
//         };
//     } catch (error) {
//         // console.log("service error", error);
//         throw error;
//     }
// }

export const serviceShopView = async (user) => {
    try {
        const {
            id,
            firstName,
            lastName,
            phone,
            address,
            longitude,
            latitude,
        } = user;

        const shop = await db.Shop.findOne({
            where: { userId: id },
        });

        if (!shop) {
            throw new Error("Shop not found");
        }

        const {
            shopName,
            openTime,
            closeTime,
            weekends,
            status,
            deliveryCharge,
        } = shop;

        const orderMetrics = await db.Order.findOne({
            where: {
                shopId: shop.id,
            },
            attributes: [
                [
                    db.sequelize.literal(
                        `COUNT(*) FILTER (WHERE status = 'pending')`
                    ),
                    "pendingCount",
                ],
                [
                    db.sequelize.literal(
                        `COUNT(*) FILTER (WHERE status = 'accepted')`
                    ),
                    "acceptedCount",
                ],
                [
                    db.sequelize.literal(
                        `COUNT(*) FILTER (WHERE status = 'ready')`
                    ),
                    "readyCount",
                ],
                [
                    db.sequelize.literal(
                        `COUNT(*) FILTER (WHERE status = 'delivered')`
                    ),
                    "deliveredCount",
                ],
                [
                    db.sequelize.literal(
                        `COUNT(*) FILTER (WHERE status = 'rejected')`
                    ),
                    "rejectedCount",
                ],
                [
                    db.sequelize.fn("COUNT", db.sequelize.col("id")),
                    "totalOrders",
                ],
                [
                    db.sequelize.literal(
                        `COALESCE(SUM("totalPrice") FILTER (WHERE status = 'delivered'), 0)`
                    ),
                    "totalIncome",
                ],
            ],
            raw: true,
        });

        const pending = Number(orderMetrics?.pendingCount || 0);
        const accepted = Number(orderMetrics?.acceptedCount || 0);
        const ready = Number(orderMetrics?.readyCount || 0);
        const delivered = Number(orderMetrics?.deliveredCount || 0);
        const rejected = Number(orderMetrics?.rejectedCount || 0);
        const totalOrders = Number(orderMetrics?.totalOrders || 0);
        const totalIncome = Number(orderMetrics?.totalIncome || 0);

        const body = {
            id: shop.id,
            shopName,

            ownerFirstName: firstName,
            ownerLastName: lastName,

            shopPhone: phone,
            shopAddress: address,

            longitude,
            latitude,

            openTime: DateTime
                .fromFormat(openTime, "HH:mm:ss")
                .toFormat("hh:mm a"),

            closeTime: DateTime
                .fromFormat(closeTime, "HH:mm:ss")
                .toFormat("hh:mm a"),

            weekends,
            status,
            deliveryCharge,

            ordersSummary: {
                pending,
                accepted,
                ready,
                delivered,
                rejected,
                totalOrders,
            },

            totalIncome,
        };

        return {
            body,
        };
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
};

export const serviceShopUpdate = async (requestBody, user) => {
    try {
        const { id } = user;
        const { ownerFirstName, ownerLastName, shopAddress, longitude, latitude, shopName, openTime, closeTime, weekends, deliveryCharge } = requestBody;
        await db.sequelize.transaction(async (t) => {

            await db.User.update(
                {
                    firstName: ownerFirstName,
                    lastName: ownerLastName,
                    address: shopAddress,
                    longitude: longitude,
                    latitude: latitude
                },
                { where: { id }, transaction: t }
            );

            await db.Shop.update(
                {
                    shopName: shopName,
                    openTime: openTime,
                    closeTime: closeTime,
                    weekends: weekends,
                    deliveryCharge: deliveryCharge
                },
                { where: { userId: id }, transaction: t }
            );

        });
        const body = {
            status: "success",
            message: "Shop profile update successful",
        }

        return {
            body,
        }

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceShopList = async () => {
    try {
        const shopList = await db.Shop.findAll({
            attributes: [
                "id",
                "shopName",
                "status",
                "deliveryCharge",
                [col("User.address"), "shopAddress"],
            ],
            include: [
                {
                    model: db.User,
                    attributes: [],
                },
            ],
            raw: true,
        });

        /**
         * here, raw is responsible for showing nested data in different styles.
         * if pass false, it will create nested json for User.
         * if pass true, it will show User data in main json like User.id, User.name...
         * 
         */

        return shopList;

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceShopDetails = async (shopId) => {
    try {
        const shopDetails = await db.Shop.findOne(
            {
                where: { id: shopId },
                attributes: [
                    "id",
                    "shopName",
                    [col("User.firstName"), "ownerFirstName"],
                    [col("User.lastName"), "ownerLastName"],
                    [col("User.phone"), "shopPhone"],
                    [col("User.address"), "shopAddress"],
                    [col("User.longitude"), "longitude"],
                    [col("User.latitude"), "latitude"],
                    "deliveryCharge",
                    "openTime",
                    "closeTime",
                    "weekends",
                    "status",
                ],
                include: [
                    {
                        model: db.User,
                        attributes: [],
                    },
                ],
                raw: true,
            }
        );
        if (!shopDetails) {
            generateError("No shop found", 400);
        }

        shopDetails.openTime = DateTime.fromFormat(shopDetails.openTime, "HH:mm:ss").toFormat("hh:mm a");
        shopDetails.closeTime = DateTime.fromFormat(shopDetails.closeTime, "HH:mm:ss").toFormat("hh:mm a");

        return shopDetails;
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}