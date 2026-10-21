import { managerError } from "../../utils/manager_error.js";
import {
    serviceNotificationList,
    serviceNotificationMarkRead,
    serviceNotificationUnreadCount,
} from "./service_notification.js";

export const controllerNotificationList = async (req, res, next) => {
    try {
        const result = await serviceNotificationList(req.user.id, req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const controllerNotificationUnreadCount = async (req, res, next) => {
    try {
        const result = await serviceNotificationUnreadCount(req.user.id);
        res.status(200).json({ unreadCount: result });
    } catch (error) {
        next(error);
    }
};

export const controllerNotificationMarkRead = async (req, res, next) => {
    try {
        managerError(req.params.notificationId, "id");
        const result = await serviceNotificationMarkRead(req.params.notificationId, req.user.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
