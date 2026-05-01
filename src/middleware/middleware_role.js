import { generateError } from "../utils/manager_error.js";

export const middleware_role = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.role;
            if (!userRole || !allowedRoles.includes(userRole)){
                 generateError("Access Denied", 403);
            }
            next();
        } catch (error) {
            next(error);
        }

    }
}