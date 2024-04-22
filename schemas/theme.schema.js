import Joi from "joi";

export const themeSchemaJoi = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "name is required",
        "string.base": "name must be a string",
    }),
});
