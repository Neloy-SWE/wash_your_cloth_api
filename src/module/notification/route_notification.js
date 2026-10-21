import express from "express";
import { middlewareAuth } from "../../middleware/middleware_auth.js";
import { middlewareRole } from "../../middleware/middleware_role.js";
import {
    controllerNotificationList,
    controllerNotificationMarkRead,
    controllerNotificationUnreadCount,
} from "./controller_notification.js";

const routerNotification = express.Router();

routerNotification.use(middlewareAuth, middlewareRole("user", "shop"));
routerNotification.get("/list", controllerNotificationList);
routerNotification.get("/unread-count", controllerNotificationUnreadCount);
routerNotification.patch("/read/:notificationId", controllerNotificationMarkRead);

export default routerNotification;
