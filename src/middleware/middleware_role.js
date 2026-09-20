import { generateError } from "../utils/manager_error.js";

export const middlewareRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.role;
            // console.log("userRole", userRole, "allowedRoles", allowedRoles);
            if (!userRole || !allowedRoles.includes(userRole)) {
                generateError("Access Denied", 403);
            }
            next();
        } catch (error) {
            next(error);
        }

    }
}