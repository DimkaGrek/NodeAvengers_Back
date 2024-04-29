import { Router } from "express";

import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import themeRouter from "./themeRouter.js";
import boardRouter from "./boardRouter.js";
import columRouter from "./columnRouter.js";
import cardRouter from "./cardRouter.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/users", authMiddleware, userRouter);

mainRouter.use("/themes", authMiddleware, themeRouter);

mainRouter.use("/board", authMiddleware, boardRouter);

mainRouter.use("/colum", authMiddleware, columRouter);

mainRouter.use("/card", authMiddleware, cardRouter);

export default mainRouter;
