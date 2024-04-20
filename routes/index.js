import { Router } from "express";
import usersRouter from "./authRouter.js";
import borderRouter from "./boardRouter.js";
import columRouter from "./columRouter.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const mainRouter = Router();

mainRouter.use("/auth", usersRouter);
mainRouter.use("/board", authMiddleware, borderRouter);
mainRouter.use("/colum", authMiddleware, columRouter);

export default mainRouter;
