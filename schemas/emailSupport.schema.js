import Joi from "joi";

export const emailSupportSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "title is required",
        "string.base": "title must be a string",
    }),
    description: Joi.string().required().messages({
        "any.required": "description is required",
        "string.base": "description must be a string",
    }),
});
