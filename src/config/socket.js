import { Server } from "socket.io";
import { Op } from "sequelize";
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
            if (!payload?.id || !payload?.sessionId || !payload?.role) {
                return next(new Error("Unauthorized"));
            }

            const user = await db.User.findByPk(payload.id, { attributes: ["id", "role"] });
            const session = await db.Session.findOne({
                where: {
                    id: payload.sessionId,
                    userId: payload.id,
                    revokedAt: null,
                    expiresAt: { [Op.gt]: new Date() },
                },
                attributes: ["id", "expiresAt"],
            });
            if (!user || user.role !== payload.role || !session) {
                return next(new Error("Unauthorized"));
            }

            socket.data.sessionId = session.id;
            socket.data.sessionExpiresAt = session.expiresAt;
            next();
        } catch (error) {
            if (Array.isArray(error)) {
                return next(new Error("Unauthorized"));
            }
            next(error);
        }
    });

    socketServer.on("connection", (socket) => {
        socket.join(`session:${socket.data.sessionId}`);
        scheduleSessionExpiry(socket, socket.data.sessionExpiresAt);
        socket.on("disconnect", () => clearTimeout(socket.data.sessionExpiryTimer));
    });

    return socketServer;
};

const scheduleSessionExpiry = (socket, expiresAt) => {
    const remaining = new Date(expiresAt).getTime() - Date.now();
    if (remaining <= 0) {
        socket.emit("session:revoked");
        socket.leave(`session:${socket.data.sessionId}`);
        return;
    }
    socket.data.sessionExpiryTimer = setTimeout(
        () => scheduleSessionExpiry(socket, expiresAt),
        Math.min(remaining, 2147483647),
    );
    socket.data.sessionExpiryTimer.unref?.();
};

export const revokeSessions = (sessionIds = []) => {
    if (!socketServer || sessionIds.length === 0) {
        return;
    }
    for (const sessionId of sessionIds) {
        const room = `session:${sessionId}`;
        socketServer.in(room).emit("session:revoked");
        socketServer.in(room).socketsLeave(room);
    }
};

export const emitToUser = async (userId, event, payload) => {
    if (!socketServer) {
        throw new Error("Socket server has not been initialized");
    }
    const sessions = await db.Session.findAll({
        where: {
            userId,
            revokedAt: null,
            expiresAt: { [Op.gt]: new Date() },
        },
        attributes: ["id"],
    });
    const rooms = sessions.map(({ id }) => `session:${id}`);
    if (rooms.length > 0) {
        socketServer.to(rooms).emit(event, payload);
    }
};
