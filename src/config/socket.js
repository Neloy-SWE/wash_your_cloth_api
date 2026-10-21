import { Server } from "socket.io";
import db from "../model/index_model.js";
import { verifyToken } from "../utils/manager_jwt_token.js";

let socketServer;

export const initializeSocket = (httpServer) => {
    socketServer = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    socketServer.use(async (socket, next) => {
        try {
            const authToken = socket.handshake.auth?.token;
            const authorization = socket.handshake.headers.authorization;
            const headerToken = authorization?.startsWith("Bearer ")
                ? authorization.slice(7)
                : undefined;
            const token = typeof authToken === "string" ? authToken : headerToken;
            if (!token) {
                return next(new Error("Unauthorized"));
            }

            const payload = verifyToken(token, "Unauthorized", 401);
            if (!payload?.id) {
                return next(new Error("Unauthorized"));
            }

            const user = await db.User.findByPk(payload.id, { attributes: ["id"] });
            if (!user) {
                return next(new Error("Unauthorized"));
            }

            socket.data.userId = user.id;
            next();
        } catch (error) {
            if (Array.isArray(error)) {
                return next(new Error("Unauthorized"));
            }
            next(error);
        }
    });

    socketServer.on("connection", (socket) => {
        socket.join(`user:${socket.data.userId}`);
    });

    return socketServer;
};

export const emitToUser = (userId, event, payload) => {
    if (!socketServer) {
        throw new Error("Socket server has not been initialized");
    }
    socketServer.to(`user:${userId}`).emit(event, payload);
};
