import express from 'express';

import authController from '../controllers/authController.js';

const authRouter = express.Router();

// sing up
authRouter.post('/register', authController.singup);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', authController.resendEmail);
authRouter.post('/verifyLogin', authController.verifyLogin);

export default authRouter;
