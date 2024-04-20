import { Router } from "express";
import usersRouter from "./authRouter.js";
import boardRouter from "./boardRouter.js";
import columRouter from "./columnRouter.js";
import cardRouter from "./cardRouter.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const mainRouter = Router();

mainRouter.use("/auth", usersRouter);
mainRouter.use("/board", authMiddleware, boardRouter);
mainRouter.use("/colum", authMiddleware, columRouter);
mainRouter.use("/card", authMiddleware, cardRouter);

export default mainRouter;
