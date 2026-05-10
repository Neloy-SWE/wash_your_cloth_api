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

export const serviceResourceItemActivation = async (id, userId) => {
    try {
        const item = await db.Item.findOne({
            where: {
                id,
                userId,
            }
        });

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
        const { itemId, serviceId } = requestBody;
        const checkService = await db.Service.findOne({
            where: {
                id: serviceId,
            },
        });

        if (!checkService) {
            generateError("Invalid service", 400);
        }

        const checkItem = await db.Item.findOne({
            where: {
                id: itemId,
            },
        });

        if (!checkItem || checkItem.userId !== userId) {
            generateError("Invalid item", 400);
        }

        if (!checkItem.isActive) {
            generateError("This item is not available", 400);
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

export const serviceResourcePriceList = async (id, role) => {
    try {

        let queryAttributes;
        let mainCondition;
        let itemCondition;

        if (role === "shop") {
            queryAttributes = [
                "id",
                [col("Service.name"), "serviceName"],
                [col("Item.name"), "itemName"],
                [col("Item.isActive"), "isItemActive"],
                "price",
                "discountPrice",
                "conveyancePrice",
                "ironPressPrice",
                "isActive"
            ];
            mainCondition = {};
            itemCondition = {
                userId: id,
            };
        } else {
            queryAttributes = [
                [col("Service.name"), "serviceName"],
                [col("Item.name"), "itemName"],
                "price",
                "discountPrice",
                "conveyancePrice",
                "ironPressPrice",
            ];
            mainCondition = {
                isActive: true,
            };
            itemCondition = {
                userId: id,
                isActive: true,
            }
        }

        const priceList = await db.Price.findAll({
            where: mainCondition,
            attributes: queryAttributes,
            include: [
                {
                    model: db.Item,
                    where: itemCondition,
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

export const serviceResourcePriceActivation = async (id, userId) => {
    try {
        const price = await db.Price.findOne({
            where: {
                id
            },
            include: [{
                model: db.Item,
                required: true,
                include: [{
                    model: db.User,
                    required: true,
                    where: {
                        id: userId,
                    }
                }],
            }],
        });

        if (!price) {
            generateError("Invalid price", 400);
        }

        const updatePrice = await price.update({ isActive: !price.isActive });

        return {
            status: "success",
            message: "Price status updated",
        };

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}