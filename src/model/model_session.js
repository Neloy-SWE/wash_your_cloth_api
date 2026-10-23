import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Session = sequelize.define("Session", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    installationId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lastUsedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    revokedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    indexes: [
        { fields: ["userId", "installationId", "revokedAt"] },
        {
            unique: true,
            fields: ["installationId"],
            where: { revokedAt: null },
        },
    ],
});

export default Session;
