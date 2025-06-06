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

const deletedUrlSchema = new mongoose.Schema({
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
    createdAt: Date,
    ipAddress: String,
    userAgent: String,
    location: {
        country: String,
        region: String,
        city: String,
        isp: String,
    },
    clicks: [clickSchema],
    deletedAt: {
        type: Date,
        default: Date.now,
    },
});

deletedUrlSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 15552000 });

export default mongoose.model("deletedURL", deletedUrlSchema);
