import jwt from "jsonwebtoken";
import db from "../model/index_model.js";
import { generateError } from "../utils/manager_error.js";
import { verifyToken } from "../utils/manager_jwt_token.js";

export const middlewareAuth = async (req, res, next) => {
  try {
    const errorMessage = "Invalid access request";
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      generateError(errorMessage, 401);
    }

    const payload = verifyToken(token, errorMessage, 401);

    const user = await db.User.findByPk(payload.id);
    if (!user) {
      generateError(errorMessage, 401);
    }

    req.user = user;
    next();
  }
  catch (error) {
    next(error);
  }
};