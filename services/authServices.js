import bcrypt from 'bcrypt';

const validatePassword = (password, hashPassword) =>
    bcrypt.compare(password, hashPassword);

export default {
    validatePassword,
};
