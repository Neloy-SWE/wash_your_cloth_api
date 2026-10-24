import { col, Op } from "sequelize";
import db from "../../model/index_model.js";
import { generateError, managerError } from "../../utils/manager_error.js";
import { getPaginatedResult, getPagination } from "../../utils/manager_pagination.js";

export const serviceResourceServiceAdd = async (requestBody, user) => {
    try {
        const { serviceName } = requestBody;
        const { id } = user;
        const existingService = await db.Service.findOne(
            {
                where: {
                    name: serviceName,
                    userId: id,
                }
            }
        );

        if (existingService) {
            generateError("Service already exist", 400);
        }

        const { serviceName: name, description } = requestBody;
        const service = await db.Service.create({ name, description, userId: id });

        return {
            status: "success",
            message: "Service added",
        }
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourceServiceList = async (userId, query = {}) => {
    try {
        const pagination = getPagination(query);
        const where = { userId };
        if (pagination.search) {
            where.name = { [Op.iLike]: pagination.searchPattern };
        }
        const { count: totalItem, rows: serviceList } = await db.Service.findAndCountAll({
            where,
            attributes: [
                "id",
                ["name", "serviceName"],
                "description",
                "isActive",
            ],
            order: [['createdAt', 'DESC'], ['id', 'DESC']],
            limit: pagination.limit,
            offset: pagination.offset,
        });

        return getPaginatedResult({
            ...pagination,
            totalItem,
            items: serviceList,
        });

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourceServiceUpdate = async (requestBody, id, userId) => {
    try {
        const currentService = await db.Service.findOne({
            where: {
                id,
                userId,
            }
        });

        if (!currentService) {
            generateError("Invalid service", 400);
        }

        const { serviceName: name, description } = requestBody;

        const updateService = await currentService.update({ name, description });

        return {
            status: "success",
            message: "Service details updated",
        }
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourceServiceActivation = async (id, userId) => {
    try {
        const service = await db.Service.findOne({
            where: {
                id,
                userId,
            }
        });

        if (!service) {
            generateError("Invalid service", 400);
        }

        const updateService = await service.update({ isActive: !service.isActive });

        return {
            status: "success",
            message: "Service status updated",
        };
    }
    catch (error) {
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

export const serviceResourceItemUpdate = async (requestBody, id, userId) => {
    try {
        const currentItem = await db.Item.findOne({
            where: {
                id,
                userId,
            }
        });

        if (!currentItem) {
            generateError("Invalid item", 400);
        }

        const { itemName: name } = requestBody;
        const updateItem = await currentItem.update({ name });

        return {
            status: "success",
            message: "Item details updated",
        };
    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}

export const serviceResourceItemList = async (userId, query = {}) => {
    try {
        const pagination = getPagination(query);
        const where = { userId };
        if (pagination.search) {
            where.name = { [Op.iLike]: pagination.searchPattern };
        }
        const { count: totalItem, rows: itemList } = await db.Item.findAndCountAll({
            where,
            attributes: [
                "id",
                ["name", "itemName"],
                "isActive",
            ],
            order: [['createdAt', 'DESC'], ['id', 'DESC']],
            limit: pagination.limit,
            offset: pagination.offset,
        });

        return getPaginatedResult({
            ...pagination,
            totalItem,
            items: itemList,
        });

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

        if (!checkService || checkService.userId !== userId) {
            generateError("Invalid service", 400);
        }

        if (!checkService.isActive) {
            generateError("This service is not available", 400);
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

export const serviceResourcePriceList = async (keyId, role, query = {}) => {
    try {
        const pagination = getPagination(query);

        let queryAttributes;
        let mainCondition;
        let itemCondition;
        let serviceCondition;

        if (role === "shop") {
            queryAttributes = [
                "id",
                [col("Service.name"), "serviceName"],
                [col("Service.isActive"), "isServiceActive"],
                [col("Service.description"), "description"],
                [col("Item.name"), "itemName"],
                [col("Item.isActive"), "isItemActive"],
                "price",
                "discountPrice",
                "ironPressPrice",
                "isActive"
            ];
            mainCondition = {};
            itemCondition = {
                userId: keyId,
            };
            serviceCondition = {
                userId: keyId,
            }
        } else if (role === "user") {
            const shop = await db.Shop.findByPk(keyId);
            if (!shop) {
                managerError("Invalid shop", 400);
            }
            queryAttributes = [
                "id",
                [col("Service.name"), "serviceName"],
                [col("Service.description"), "description"],
                [col("Item.name"), "itemName"],
                "price",
                "discountPrice",
                "ironPressPrice",
            ];
            mainCondition = {
                isActive: true,
            };
            itemCondition = {
                userId: shop.userId,
                isActive: true,
            }
            serviceCondition = {
                userId: shop.userId,
                isActive: true,
            }
        }

        const where = { ...mainCondition };
        if (pagination.search) {
            where[Op.or] = [
                { "$Service.name$": { [Op.iLike]: pagination.searchPattern } },
                { "$Item.name$": { [Op.iLike]: pagination.searchPattern } },
            ];
        }

        const { count: totalItem, rows: priceList } = await db.Price.findAndCountAll({
            where,
            attributes: queryAttributes,
            include: [
                {
                    model: db.Item,
                    where: itemCondition,
                    attributes: [],
                },
                {
                    model: db.Service,
                    where: serviceCondition,
                    attributes: [],
                }
            ],
            order: [['createdAt', 'DESC'], ['id', 'DESC']],
            limit: pagination.limit,
            offset: pagination.offset,
            subQuery: false,
        });
        return getPaginatedResult({
            ...pagination,
            totalItem,
            items: priceList,
        });
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
            include: [
                {
                    model: db.Item,
                    required: true,
                    include: [{
                        model: db.User,
                        required: true,
                        where: {
                            id: userId,
                        }
                    }],
                },
                {
                    model: db.Service,
                    required: true,
                    include: [{
                        model: db.User,
                        required: true,
                        where: {
                            id: userId,
                        }
                    }],
                }
            ],
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

export const serviceResourcePriceUpate = async (requestBody, id, userId) => {
    try {
        const currentPrice = await db.Price.findOne({
            where: {
                id
            },
            include: [
                {
                    model: db.Item,
                    required: true,
                    include: [{
                        model: db.User,
                        required: true,
                        where: {
                            id: userId,
                        }
                    }],
                },
                {
                    model: db.Service,
                    required: true,
                    include: [{
                        model: db.User,
                        required: true,
                        where: {
                            id: userId,
                        }
                    }]
                }],
        });

        if (!currentPrice) {
            generateError("Invalid price", 400);
        }

        // const { price, discountPrice, conveyancePrice, ironPressPrice } = requestBody;
        const updatePrice = await currentPrice.update(requestBody);

        return {
            status: "success",
            message: "Price details updated",
        }

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}