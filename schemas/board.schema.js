import Joi from "joi";

export const boardSchemaJoi = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "name is required",
        "string.base": "name must be a string",
    }),
    userId: Joi.string().required().messages({
        "any.required": "userId is required",
        "string.pattern.base": "userId must be a valid ObjectId",
    }),
    icon: Joi.number().required().messages({
        "any.required": "icon number is required",
        "number.base": "icon must be a number",
    }),
    backgroundImage: Joi.number().required().messages({
        "any.required": "background image number is required",
        "number.base": "background image must be a number",
    }),
});