import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 1,
            maxlength: 30,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }


    },

    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)