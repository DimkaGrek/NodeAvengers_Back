import Joi from "joi";

export const cardSchemaJoi = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "title is required",
    }),
    description: Joi.string().required().messages({
        "any.required": "description is required",
    }),
    priority: Joi.string().valid("low", "medium", "high", "without").messages({
        "any.only":
            "priority role, choose one of them low, medium, high, without",
    }),
    deadline: Joi.alternatives().try(
        Joi.date().allow(null),
        Joi.string().valid(null)
    ),
    columnId: Joi.string().required().messages({
        "any.required": "columnId is required",
    }),
});
