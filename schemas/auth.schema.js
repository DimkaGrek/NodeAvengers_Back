import Joi from "joi";

export const authSchemaLoginJoi = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "email is required",
        "string.base": "The password must be a text string.",
        "string.email": "email must be in email format (like jonh@mail.com)",
    }),
    password: Joi.string()
        .pattern(
            new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]*$')
        ) // Дозволяє латинські літери, цифри та спецсимволи, крім пробілів
        .min(8)
        .max(64)
        .required()
        .messages({
            "any.required": "password is required",
            "string.empty": "The password cannot be empty.",
            "string.base": "The password must be a text string.",
            "string.min":
                "The password must contain at least {#limit} characters.",
            "string.max":
                "The password must contain no more than {#limit} characters.",
            "string.pattern.base":
                "The password can only contain Latin letters, numbers, and special characters, and must not include spaces.",
        }),
});

export const authSchemaRegisterJoi = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "email is required",
        "string.base": "The password must be a text string.",
        "string.email": "email must be in email format (like jonh@mail.com)",
    }),
    password: Joi.string()
        .pattern(
            new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]*$')
        ) // Дозволяє латинські літери, цифри та спецсимволи, крім пробілів
        .min(8)
        .max(64)
        .required()
        .messages({
            "any.required": "password is required",
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
        "string.max": "The name must contain no more than {#limit} characters.",
    }),
});

export const authSchemaResendEmailJoi = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "email is required",
        "string.base": "The password must be a text string.",
        "string.email": "email must be in email format (like jonh@mail.com)",
    }),
});

export const authSchemaRefreshJoi = Joi.object({
    refreshToken: Joi.string().required().messages({
        "any.required": "refreshToken is required",
        "string.base": "The refreshToken must be a text string.",
    }),
});
