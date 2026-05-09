import { col } from "sequelize";
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
        const existingItem = await db.Item.findOne(
            {
                where: {
                    name: itemName,
                    userId: id,
                }
            }
        );

        if (existingItem) {
            generateError("Item already exist", 400);
        }

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
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourcePriceAdd = async (requestBody, userId) => {
    try {
        const { itemId } = requestBody;
        const checkItem = await db.Item.findOne({
            where: {
                id: itemId,
            },
        });

        if (checkItem.userId !== userId) {
            generateError("Invalid item", 400);
        }

        const existingPrice = await db.Price.findOne({
            where: requestBody,
        });

        if (existingPrice) {
            generateError("Price already exist", 400);
        }
        const price = await db.Price.create(requestBody);
        return {
            status: "success",
            message: "Price added",
        }
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourcePriceListShop = async (id) => {
    try {
        const priceList = await db.Price.findAll({
            attributes: [
                [col("Service.name"), "serviceName"],
                [col("Item.name"), "itemName"],
                "price",
                "ironPressPrice",
            ],
            include: [
                {
                    model: db.Item,
                    where: { userId: id },
                    attributes: [],
                },
                {
                    model: db.Service,
                    attributes: [],
                }
            ]
        });
        return priceList;
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}