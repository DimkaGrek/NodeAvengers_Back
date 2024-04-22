import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import HttpError from "../helpers/HttpError.js";
import { findByFilter } from "../services/FindOneService.js";
import authServices from "../services/authServices.js";
import UserDto from "../dto/UserDto.js";

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id });
        const userDto = new UserDto(user);
        res.json(userDto);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw HttpError(404);
        }
        // check if request contains file
        console.log("avatarURL before check: ", user.avatarURL);
        if (req.file) {
            user.avatarURL = req.file.path;
        }
        console.log("avatarURL after check: ", user.avatarURL);

        // console.log("req.file.path: ", req.file.path);
        console.log("req.body ", req.body);
        const { userData } = req.body;
        if (userData) {
            try {
                const parseData = JSON.parse(userData);
                console.log("userData: ", parseData);
                const { name, email, password, newpassword } = parseData;

                if (name) {
                    user.name = name;
                }
                if (email) {
                    user.email = email;
                }
                if (password && newpassword) {
                    //check password
                    const comparePassword = await authServices.validatePassword(
                        password,
                        user.password
                    );
                    if (!comparePassword) {
                        throw HttpError(
                            403,
                            "Your current password is not valid"
                        );
                    }
                    const hashPassword = await bcrypt.hash(newpassword, 10);
                    user.password = hashPassword;
                }
            } catch (error) {
                console.error(error);
            }
        }

        console.log("user before save: ", user);
        await user.save();
        // console.log("user: ", user);
        const userDto = new UserDto(user);

        res.json(userDto);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const changeUserTheme = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { themeId } = req.body;
        if (!themeId) {
            throw HttpError(400, "No themeId");
        }
        await User.findByIdAndUpdate(id, { themeId }, { new: true });

        res.json({ themeId });
    } catch (error) {
        next(error);
    }
};
