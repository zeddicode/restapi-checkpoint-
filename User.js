import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        Unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    });

    module.exports = mongoose.model('User', UserSchema);