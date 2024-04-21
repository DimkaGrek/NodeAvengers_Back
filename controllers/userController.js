import { User } from "../models/user.model.js";
import HttpError from "../helpers/HttpError.js";
import { findByFilter } from "../services/FindOneService.js";
import authServices from "../services/authServices.js";

export const updateUser = async (req, res, next) => {
    try {
        const { id, name, email, password, newpassword } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw HttpError(404);
        }
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
                throw HttpError(403, "Your current password is not valid");
            }
            const hashPassword = await bcrypt.hash(newpassword, 10);
            user.password = hashPassword;
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};
