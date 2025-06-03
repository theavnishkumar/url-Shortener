import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    ipAddress: String,
    userAgent: String,
    location: {
        country: String,
        region: String,
        city: String,
        isp: String,
    },
    clickedAt: { type: Date, default: Date.now },
});

const urlData = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 60 * 24 * 365 * 2,
    },
    ipAddress: String,
    userAgent: String,
    location: {
        country: String,
        region: String,
        city: String,
        isp: String,
    },
    clicks: [clickSchema],
});

export default mongoose.model("shorturl", urlData);
