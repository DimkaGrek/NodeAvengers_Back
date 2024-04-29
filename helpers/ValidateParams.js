import HttpError from "./HttpError.js";

export const validateParams= () => {
    const func = (req, _, next) => {
        const { id } = req.params;
        if (!(!/^\d+$/.test(id))) {
            next(HttpError(400, 'Incorrect id'));
        }
        next();
    };
    return func;
};
