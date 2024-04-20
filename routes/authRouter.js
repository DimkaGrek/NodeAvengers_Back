import express from 'express';

import authController from '../controllers/authController.js';

const authRouter = express.Router();

// sing up
authRouter.post('/register', authController.singup);

// sing in
authRouter.post('/login', authController.signin);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', authController.resendEmail);
authRouter.post('/verifyLogin', authController.verifyLogin);
authRouter.get('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);

authRouter.get('/google', authController.googleAuth);
authRouter.get('/google-redirect', authController.googleRedirect);

authRouter.delete('/delete', authController.deleteUser);

export default authRouter;
