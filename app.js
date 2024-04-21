import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mainRouter from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" assert { type: "json" };

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(
    cors({
        origin: process.env.URL_FRONT, // Замініть на домен, з якого ви відправляєте запити
        credentials: true,
    })
);
app.use(express.json());

app.use("/api", mainRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server is running. Use our API on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
main();
