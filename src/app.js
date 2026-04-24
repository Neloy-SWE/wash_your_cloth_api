import express from "express";
import routerUser from "./feature/auth/user/route_user.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { sequelize } from "./config/database.js";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// application check
app.get("/", (req, res) => {
    res.send("Welcome to Wash Your Cloth API");
});

// Register routes
app.use("/auth", routerUser);

// Global error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    // res.status(500).json({ error: "Internal Server Error" });
});

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synchronized");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});