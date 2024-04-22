import Joi from "joi";

export const cardSchemaJoi = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "title is required",
    }),
    description: Joi.string().required().messages({
        "any.required": "description is required",
    }),
    priority: Joi.string().valid("low", "medium", "high").messages({
        "any.only": "priority role, choose one of them low, medium, high",
    }),
    deadline: Joi.date().required().messages({
        "any.required": "deadline is required",
    }),
    columnId: Joi.string().required().messages({
        "any.required": "columnId is required",
    }),
});
