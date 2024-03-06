import mongoose from "mongoose";

// Urls Schema 
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    clicks:
        [{ timestamp: { type: Number } }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
}, { timestamps: true });

// Creating a model

const urls = new mongoose.model('url', urlSchema);

export {urls};