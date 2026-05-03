import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";

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

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}