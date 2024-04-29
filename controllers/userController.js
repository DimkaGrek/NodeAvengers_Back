import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";
import UserDto from "../dto/UserDto.js";
import { Email } from "../models/email.model.js";
import MailService from "../services/MailService.js";

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
            throw HttpError(404, "No user found");
        }
        const errors = [];
        // check if request contains file

        if (req.file) {
            user.avatarURL = req.file.path;
        }
    
        const { userData } = req.body;
        if (userData) {
            try {
                const parseData = JSON.parse(userData);
          
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
                        errors.push({
                            403: "Your current password is not valid",
                        });
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

      
        await user.save();
 
        const userDto = new UserDto(user);

        res.json({ ...userDto, errors });
    } catch (error) {
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

export const supportUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw HttpError(404, "No user found");
        }
      
        const { title, description } = req.body;

        await MailService.sendSupportMail(
            "taskpro.project@gmail.com",
            title,
            description,
            user.email
        );

        const support = await Email.create({
            title,
            description,
            userId: user._id,
        });
      

        res.status(201).json(support);
    } catch (error) {
        next(error);
    }
};
