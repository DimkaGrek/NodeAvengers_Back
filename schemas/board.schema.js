import Joi from "joi";

export const boardSchemaJoi = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "name is required",
        "string.base": "name must be a string",
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

export const boardParamsSchemaJoi = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "id is required",
        "string.base": "id must be a string",
    }),
});