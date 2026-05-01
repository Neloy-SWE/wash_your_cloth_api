import express from "express";
import routerAuth from "./feature/auth/route_auth.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import db from "./model/index_model.js";
import rateLimit from "express-rate-limit";
import routeProfile from "./feature/profile/route_profile.js";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    handler: (req, res, next) => {
        res.status(429).json({ status: "limitExceeded", message: "Too many requests" });
    }
});

// apply rate limiter to global level:
app.use(globalLimiter);

// application check
app.get("/", (req, res) => {
    res.send("Welcome to Wash Your Cloth API");
});

// Register routes
app.use("/auth", routerAuth); // auth
app.use("/profile", routeProfile) // profile

// Global error handling middleware
app.use((error, req, res, next) => {
    // console.error("global error handler: ", error);
    res.status(error.statusCode || 500)
        .json({ error: error.errors?.map(e => e.message) || error?.map(e => e.message) || "Internal Server Error" });
    // .json({ error: error.errors?.map(e => e.message) || "Internal Server Error" });
});

db.sequelize.sync({ alter: true }).then(() => {
    // db.sequelize.sync().then(() => {
    console.log("Database synchronized");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});