import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    ipAddress: String,
    userAgent: String,
    location: {
        country: String,
        region: String,
        city: String,
        isp: String,
    },
    loginAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 365,
    },
});

const Logins = mongoose.model("Logins", loginSchema);
export { Logins };
