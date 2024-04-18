import jwt from 'jsonwebtoken';
// import Token from '../models/Token.js';

const generateTokens = (payload) => {
    console.log('payload: ', payload);
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1d',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d',
    });
    return {
        accessToken,
        refreshToken,
    };
};

const validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return userData;
    } catch (error) {
        return null;
    }
};

const validateRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return userData;
    } catch (error) {
        return null;
    }
};

// const saveToken = async (userId, refreshToken) => {
//     const tokenData = await User.findOne({});
//     if (tokenData) {
//         tokenData.refreshToken = refreshToken;
//         return tokenData.save();
//     }
//     const token = await Token.create({ userId: userId, refreshToken });
//     return token;
// };

const removeToken = async (refreshToken) => {
    const tokenData = await Token.destroy({ where: { refreshToken } });
    return tokenData;
};

const findToken = async (refreshToken) => {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
};

export default {
    generateTokens,
    // saveToken,
    removeToken,
    validateAccessToken,
    validateRefreshToken,
    findToken,
};
