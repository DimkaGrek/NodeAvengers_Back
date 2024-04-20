import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';

import HttpError from '../helpers/HttpError.js';
import authServices from '../services/authServices.js';
import { User } from '../models/user.model.js';
import MailService from '../services/MailService.js';
import UserDto from '../dto/UserDto.js';
import TokenService from '../services/TokenService.js';

const singup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await authServices.findUser({ email });

        if (user) {
            throw HttpError(409, 'Email in use');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);

        const verificationToken = nanoid();

        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}${process.env.API_PREFIX}/auth/verify/${verificationToken}`
        );

        const newUser = await User.create({
            email,
            password: hashPassword,
            name: 'User',
            avatarURL,
            verificationToken,
        });
        res.status(201).json({ email, name: newUser.name, avatarURL });
    } catch (error) {
        next(error);
    }
};

const verify = async (req, res, next) => {
    try {
        let { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });
        if (!user) {
            return res.redirect(`${process.env.URL_SUCCESS}/2`);
        }
        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: '',
        });

        verificationToken = nanoid();
        user.verificationToken = verificationToken;
        await user.save();

        res.redirect(`${process.env.URL_SUCCESS}/1?token=${verificationToken}`);
    } catch (error) {
        next(error);
    }
};

const resendEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(404);
        }
        if (user.verify) {
            throw HttpError(400, 'Verification has already been passed');
        }

        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}${process.env.API_PREFIX}/auth/verify/${user.verificationToken}`
        );

        res.json({
            message: 'Email send success',
        });
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authServices.findUser({ email });
        if (!user) {
            throw HttpError(401, 'Email or password wrong');
        }

        // check if user verified
        if (!user.verify) {
            throw HttpError(403, 'User is not verified yet');
        }

        //check password
        const comparePassword = await authServices.validatePassword(
            password,
            user.password
        );
        if (!comparePassword) {
            throw HttpError(401, 'Email or password wrong');
        }
    } catch (error) {
        next(error);
    }
};

const verifyLogin = async (req, res, next) => {
    try {
        const { token } = req.body;

        console.log('token from verify page', token);
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            console.log('if no user verify token....');
            throw HttpError(404, 'No user found');
        }

        user.verificationToken = '';
        console.log('verifyToken delete...');

        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ ...userDto });

        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        return res.json({ ...tokens, user: userDto });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(404, 'No user found');
    }
    await User.deleteOne({ email });

    res.json({ message: 'user deleted successfully' });
};

export default {
    singup,
    verify,
    resendEmail,
    verifyLogin,
    deleteUser,
};
