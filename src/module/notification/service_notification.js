import db from "../../model/index_model.js";
import { emitToUser } from "../../config/socket.js";
import { generateError } from "../../utils/manager_error.js";

const notificationAttributes = [
    "id",
    "title",
    "message",
    "isRead",
    "navigation",
    "metaData",
    "createdAt",
];

export const createAppNotification = async ({
    userId,
    title,
    message,
    navigation,
    metaData,
    transaction,
}) => db.AppNotification.create({
    userId,
    title,
    message,
    navigation,
    metaData,
}, { transaction });

export const publishAppNotification = async (notification) => {
    const payload = notification.get({ plain: true });
    const { userId, ...userNotification } = payload;
    try {
        await emitToUser(userId, "notification:new", userNotification);
    } catch (error) {
        console.error("Unable to emit notification to active sessions:", error);
    }
};

export const serviceNotificationList = async (userId, query) => {
    const currentPage = query.currentPage === undefined ? 0 : Number(query.currentPage);
    const pageSize = query.pageSize === undefined ? 15 : Number(query.pageSize);

    if (!Number.isInteger(currentPage) || currentPage < 0
        || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
        generateError("Invalid pagination", 400);
    }

    const { count: totalItem, rows: notifications } = await db.AppNotification.findAndCountAll({
        where: { userId },
        attributes: notificationAttributes,
        order: [["createdAt", "DESC"]],
        limit: pageSize,
        offset: currentPage * pageSize,
    });

    return {
        currentPage,
        pageSize,
        totalItem,
        notifications,
    };
};

export const serviceNotificationUnreadCount = async (userId) => db.AppNotification.count({
    where: {
        userId,
        isRead: false,
    },
});

export const serviceNotificationMarkRead = async (notificationId, userId) => {
    const notification = await db.AppNotification.findOne({
        where: {
            id: notificationId,
            userId,
        },
    });
    if (!notification) {
        generateError("Wrong notification", 404);
    }

    if (!notification.isRead) {
        notification.isRead = true;
        await notification.save();
    }

    return {
        status: "success",
        message: "Notification marked as read",
    }
};
