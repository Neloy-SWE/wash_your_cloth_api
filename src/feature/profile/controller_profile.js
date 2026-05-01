import { managerError } from "../../utils/manager_error.js";
import { serviceProfileChangePassword } from "./service_profile.js";

export const controllerProfileChangePassword = async (req, res, next) => {
    try {
        managerError(req.body, "password");
        const result = await serviceProfileChangePassword(req.body, req.user);
        res.status(result.statusCode).json(result.body);

    } catch (error) {
        // console.log("controller error", error);
        next(error);
    }
}