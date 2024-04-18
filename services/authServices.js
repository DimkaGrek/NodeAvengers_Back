import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

const findUser = (filter) => User.findOne(filter);
// kuku
const validatePassword = (password, hashPassword) =>
    bcrypt.compare(password, hashPassword);

export default {
    findUser,
    validatePassword,
};
