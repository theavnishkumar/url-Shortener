import { nanoid } from "nanoid";
import urlData from "../models/urlData.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";
import mongoose from "mongoose";



export async function handleGenerateUrl(req, res) {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: "Original URL is required" });
    }

    try {
        const shortId = nanoid(6);
        const ip = getClientIp(req);
        const userAgent = req.headers["user-agent"];
        const location = await getLocationFromIp(ip);

        const newShortUrl = new urlData({
            originalUrl,
            shortId,
            createdBy: req.user.id,
            ipAddress: ip,
            userAgent,
            location,
            createdAt: new Date(),
            clicks: [],
        });

        await newShortUrl.save();

        return res.status(201).json({
            message: "Short URL created successfully"
        });
    } catch (err) {
        console.error("Short URL creation error:", err);
        return res.status(500).json({ error: "Something went wrong while creating URL" });
    }
}

export const handleGetUrl = async (req, res) => {
    try {
        const userData = await urlData.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $project: {
                    originalUrl: 1,
                    shortId: 1,
                    createdAt: 1,
                    clicksCount: { $size: { $ifNull: ["$clicks", []] } }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        if (!userData) {
            return res.status(404).json({ message: "User Data not found" });
        }

        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function handleDeleteUrl(req, res) {
    try {
        const { _id } = req.params;

        const deletedUrl = await urlData.findByIdAndDelete(_id);

        if (!deletedUrl) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.status(200).json({ message: "URL deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}