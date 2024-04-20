import { Schema, model } from 'mongoose';
import { Theme } from '../models/theme.model.js';

const UserSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        accessToken: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            nullable: true,
        },
        themeId: {
            type: Schema.Types.ObjectId,
            ref: 'Theme',
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            nullable: true,
        },
    },
    { versionKey: false }
);

UserSchema.pre('save', async function (next) {
    if (!this.themeId) {
        const defaultTheme = await Theme.findOne().sort({ _id: 1 }).exec();
        this.themeId = defaultTheme ? defaultTheme._id : null;
    }
});
export const User = model('User', UserSchema);
