import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import queryString from "query-string";
import axios from "axios";
import { response } from "express";

import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";
import { User } from "../models/user.model.js";
import MailService from "../services/MailService.js";
import UserDto from "../dto/UserDto.js";
import TokenService from "../services/TokenService.js";
import { findByFilter } from "../services/FindOneService.js";

const singup = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const user = await findByFilter(User, { email });

        if (user) {
            throw HttpError(409, "Email in use");
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
            name: name ? name : "User",
            avatarURL,
            verificationToken,
        });
        res.status(201).json({ email });
    } catch (error) {
        next(error);
    }
};

const verify = async (req, res, next) => {
    try {
        let { verificationToken } = req.params;
        console.log("verifyToken: ", verificationToken);
        const user = await User.findOne({ verificationToken });
        if (!user) {
            console.log("if no token");
            return res.redirect(`${process.env.URL_SUCCESS}/2`);
        }
        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: "",
        });

        verificationToken = nanoid();
        user.verificationToken = verificationToken;
        await user.save();

        console.log(
            "url-redirect: ",
            `${process.env.URL_SUCCESS}/1?token=${verificationToken}`
        );

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
            throw HttpError(400, "Verification has already been passed");
        }

        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}${process.env.API_PREFIX}/auth/verify/${user.verificationToken}`
        );

        res.json({
            message: "Email send success",
        });
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findByFilter(User, { email });
        if (!user) {
            throw HttpError(401, "Email or password wrong");
        }

        // check if user verified
        if (!user.verify) {
            throw HttpError(403, "User is not verified yet");
        }

        //check password
        const comparePassword = await authServices.validatePassword(
            password,
            user.password
        );
        if (!comparePassword) {
            throw HttpError(401, "Email or password wrong");
        }
        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ ...userDto });

        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        res.cookie("refreshToken", user.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.json({ ...tokens, user: userDto });
    } catch (error) {
        next(error);
    }
};

const verifyLogin = async (req, res, next) => {
    try {
        const { token } = req.body;

        console.log("token from verify page", token);
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            console.log("if no user verify token....");
            throw HttpError(404, "No user found");
        }

        user.verificationToken = "";
        console.log("verifyToken delete...");

        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ ...userDto });

        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        res.cookie("refreshToken", user.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.json({ ...tokens, user: userDto });
    } catch (error) {
        next(error);
    }
};

const googleAuth = async (req, res, next) => {
    try {
        console.log("client_id: ", process.env.GOOGLE_CLIENT_ID);
        const stringifiedParams = queryString.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: `${process.env.API_URL}${process.env.API_PREFIX}/auth/google-redirect`,
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
            ].join(" "),
            response_type: "code",
            access_type: "offline",
            prompt: "consent",
        });
        return res.redirect(
            `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
        );
    } catch (error) {
        next(error);
    }
};

const googleRedirect = async (req, res, next) => {
    try {
        const { code } = req.query;

        const tokenData = await axios({
            url: "https://oauth2.googleapis.com/token",
            method: "post",
            data: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${process.env.API_URL}${process.env.API_PREFIX}/auth/google-redirect`,
                grant_type: "authorization_code",
                code,
            },
        });
        const userData = await axios({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            method: "get",
            headers: {
                Authorization: `Bearer ${tokenData.data.access_token}`,
            },
        });

        const { email, name, picture } = userData.data;
        let user = await findByFilter(User, { email });
        if (!user) {
            const newUser = await User.create({
                email,
                password: nanoid(),
                name,
                avatarURL: picture,
                verify: true,
                verificationToken: tokenData.data.access_token,
            });
            user = newUser;
        } else {
            user.verificationToken = tokenData.data.access_token;
            await user.save();
        }

        res.redirect(
            `${process.env.URL_SUCCESS}/3?token=${user.verificationToken}`
        );
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await findByFilter(User, { email });
        if (!user) {
            throw HttpError(404, "No user found");
        }
        await User.deleteOne({ email });

        res.json({ message: "user deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("refreshToken: ", refreshToken);
        if (!refreshToken) {
            throw HttpError(401, "No refresh token provided'");
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        console.log("userData: ", userData);
        const user = await findByFilter(User, { refreshToken });
        if (!userData || !user.refreshToken) {
            throw HttpError(401);
        }
        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ ...userDto });

        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();
        res.cookie("refreshToken", user.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.json({ ...tokens, user: userDto });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        // console.log('cookies: ', req.cookies);
        // const { refreshToken } = req.cookies;
        // if (!refreshToken) {
        //     console.log('no refreshTokens in cookies');
        //     throw HttpError(401, 'no refreshTokens in cookies');
        // }
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw HttpError(401);
        }
        console.log("refreshToken for logout: ", refreshToken);
        const user = await findByFilter(User, { refreshToken });

        if (!user) {
            console.log("no user by refreshToken");
            throw HttpError(401);
        }
        console.log("user findByFilter by refreshToken");
        user.accessToken = "";
        user.refreshToken = "";
        await user.save();
        res.clearCookie("refreshToken");
        return res.status(200).json(refreshToken);
    } catch (error) {
        next(error);
    }
};

export default {
    singup,
    verify,
    resendEmail,
    signin,
    verifyLogin,
    deleteUser,
    googleAuth,
    googleRedirect,
    refresh,
    logout,
};
