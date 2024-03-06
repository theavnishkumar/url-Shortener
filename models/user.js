import mongoose from "mongoose";

// Users Schema

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});

// Creating a model

const users = new mongoose.model('users', userSchema);

export {users};