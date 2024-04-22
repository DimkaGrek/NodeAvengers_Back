import Joi from "joi";

export const columnSchemaJoi = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "name is required",
        "string.base": "name must be a string",
    }),
    boardId: Joi.string().required().messages({
        "any.required": "boardId is required",
        "string.pattern.base": "boardId must be a valid ObjectId",
    }),
});
