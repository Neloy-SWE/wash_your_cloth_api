import db from "../../model/index_model.js";

export const serviceResourceServiceList = async () => {
    try {
        const serviceList = await db.Service.findAll();

        return serviceList;

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourceItemAdd = async (requestBody, user) => {
    try {
        const { itemName } = requestBody;
        const { id } = user;
        const item = await db.Item.create({
            name: itemName,
            userId: id,
        });

        return {
            status: "success",
            message: "Item added",
        }

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourceItemList = async () => {
    try {
        const itemList = await db.Item.findAll();

        return itemList;

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}