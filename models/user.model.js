import { Schema, model } from 'mongoose';

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
export const User = model('User', UserSchema);
