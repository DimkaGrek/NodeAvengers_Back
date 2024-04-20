import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const auth = req.headers.authorization.split(" ");
        if (auth[0] !== "Bearer") throw Error;
        const token = auth[1];
        if (!token) {
            throw Error;
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw Error;
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "User doesn`t auth" });
    }
};
