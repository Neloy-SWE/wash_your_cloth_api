import db from "../../model/index_model.js";
import { generateError } from "../../utils/manager_error.js";

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

export const serviceResourceItemList = async (userId) => {
    try {
        const itemList = await db.Item.findAll({
            where: {
                userId
            },
            attributes: [
                "id",
                "name",
                "isActive",
            ]
        });

        return itemList;

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourceActivation = async (id) => {
    try {
        const item = await db.Item.findByPk(id);

        if (!item) {
            generateError("Invalid item", 400);
        }

        const updateItem = await item.update({ isActive: !item.isActive });

        return {
            status: "success",
            message: "Item status updated",
        };

    } catch (error) {
        console.log("service error", error);
        throw error;
    }
}