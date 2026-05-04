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
        const { id, firstName, lastName, phone, address, longitude, latitude } = user;

        const shop = await db.Shop.findOne({
            where: { userId: id, },
        });
        const { shopName, openTime, closeTime, weekends, status } = shop;

        const body = {
            shopName,
            ownerFirstName: firstName,
            ownerLastName: lastName,
            shopPhone: phone,
            shopAddress: address,
            longitude,
            latitude,
            openTime: DateTime.fromFormat(openTime, "HH:mm:ss").toFormat("hh:mm a"),
            closeTime: DateTime.fromFormat(closeTime, "HH:mm:ss").toFormat("hh:mm a"),
            weekends,
            status,
        }

        return {
            body,
        }

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceShopUpdate = async (requestBody, user) => {
    try {
        const { id } = user;
        const { ownerFirstName, ownerLastName, shopAddress, longitude, latitude, shopName, openTime, closeTime, weekends } = requestBody;
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
                    weekends: weekends
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
                "isActive",
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