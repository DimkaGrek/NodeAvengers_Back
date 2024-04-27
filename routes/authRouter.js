import express from "express";

import authController from "../controllers/authController.js";
import { validateBody } from "../helpers/ValidateBody.js";
import {
    authSchemaLoginJoi,
    authSchemaRegisterJoi,
    authSchemaResendEmailJoi,
} from "../schemas/auth.schema.js";

const authRouter = express.Router();

// sing up
authRouter.post(
    "/register",
    validateBody(authSchemaRegisterJoi),
    authController.singup
);

// sing in
authRouter.post(
    "/login",
    validateBody(authSchemaLoginJoi),
    authController.signin
);
authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post("/verify", authController.resendEmail);
authRouter.post("/verifyLogin", authController.verifyLogin);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
authRouter.post(
    "/resendEmail",
    validateBody(authSchemaResendEmailJoi),
    authController.resendEmail
);
authRouter.post(
    "/resendPassword",
    validateBody(authSchemaResendEmailJoi),
    authController.resendPassword
);
authRouter.patch("/verifyResendPassword", authController.verifyResendPassword);

authRouter.get("/google", authController.googleAuth);
authRouter.get("/google-redirect", authController.googleRedirect);

authRouter.delete("/delete", authController.deleteUser);

export default authRouter;
