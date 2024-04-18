import { Router } from "express";
import usersRouter from "./authRouter.js";

const mainRouter = Router();

mainRouter.use("/auth", usersRouter);

export default mainRouter;
