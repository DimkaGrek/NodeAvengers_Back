import Joi from "joi";

export const userSchemaJoi = Joi.object({
    email: Joi.string().email().messages({
        "string.base": "The password must be a text string.",
        "string.email": "email must be in email format (like jonh@mail.com)",
    }),
    password: Joi.string()
        .pattern(
            new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]*$')
        ) // Дозволяє латинські літери, цифри та спецсимволи, крім пробілів
        .min(8)
        .max(64)
        .messages({
            "string.empty": "The password cannot be empty.",
            "string.base": "The password must be a text string.",
            "string.min":
                "The password must contain at least {#limit} characters.",
            "string.max":
                "The password must contain no more than {#limit} characters.",
            "string.pattern.base":
                "The password can only contain Latin letters, numbers, and special characters, and must not include spaces.",
        }),
    newpassword: Joi.string()
        .pattern(
            new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]*$')
        ) // Дозволяє латинські літери, цифри та спецсимволи, крім пробілів
        .min(8)
        .max(64)
        .messages({
            "string.empty": "The password cannot be empty.",
            "string.base": "The password must be a text string.",
            "string.min":
                "The password must contain at least {#limit} characters.",
            "string.max":
                "The password must contain no more than {#limit} characters.",
            "string.pattern.base":
                "The password can only contain Latin letters, numbers, and special characters, and must not include spaces.",
        }),
    name: Joi.string().min(2).max(32).messages({
        "string.base": "The name must be a text string.",
        "string.min": "The name must contain at least {#limit} characters.",
        "string.max":
            "The name must contain no more than {#limit} characters.",
    }),
});
