import mongoose, { Schema } from "mongoose";
import bycrypt from "bcrypt"

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

// hashing the password if not hashed
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bycrypt.hash(this.password, 10);
    next();
})

// comapir passwords

userSchema.method.comparePassword = async function (password) {
    return await bycrypt.compare(password, this.password)
}
export const User = mongoose.model("User", userSchema)