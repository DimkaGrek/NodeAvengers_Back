import jwt from 'jsonwebtoken';


const generateTokens = (payload) => {
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
    removeToken,
    validateAccessToken,
    validateRefreshToken,
    findToken,
};
