import { nanoid } from "nanoid";
import urlData from "../models/urlData.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";
import mongoose from "mongoose";
import { connectDB } from "../connection.js";
import { deletedURL } from "../models/deletedURL.js";



export async function handleGenerateUrl(req, res) {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: "Original URL is required" });
    }

    try {
        await connectDB();
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
        await connectDB();
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
        await connectDB();
        const { _id } = req.params;

        const urlToDelete = await urlData.findById(_id);
        if (!urlToDelete) {
            return res.status(404).json({ message: "URL not found" });
        }

        const backupUrl = new deletedURL({
            originalUrl: urlToDelete.originalUrl,
            shortId: urlToDelete.shortId,
            createdBy: urlToDelete.createdBy,
            createdAt: urlToDelete.createdAt,
            ipAddress: urlToDelete.ipAddress,
            userAgent: urlToDelete.userAgent,
            location: urlToDelete.location,
            clicks: urlToDelete.clicks,
            deletedAt: new Date(),
        });

        await backupUrl.save();

        await urlData.findByIdAndDelete(_id);

        res.status(200).json({ message: "URL deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}


// I have generate this aggregation using chatGPT
export const getUrlAnalytics = async (req, res) => {
    await connectDB();

    const userId = req.user.id;
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(now.setDate(now.getDate() - 1));
    const startOf7Days = new Date(now.setDate(now.getDate() - 6));
    const startOf30Days = new Date(now.setDate(now.getDate() - 23));

    try {
        const analytics = await urlData.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$clicks" },

            {
                $facet: {
                    today: [
                        { $match: { "clicks.clickedAt": { $gte: startOfToday } } },
                        { $count: "count" }
                    ],
                    yesterday: [
                        {
                            $match: {
                                "clicks.clickedAt": {
                                    $gte: startOfYesterday,
                                    $lt: startOfToday
                                }
                            }
                        },
                        { $count: "count" }
                    ],
                    last7Days: [
                        { $match: { "clicks.clickedAt": { $gte: startOf7Days } } },
                        { $count: "count" }
                    ],
                    last30Days: [
                        { $match: { "clicks.clickedAt": { $gte: startOf30Days } } },
                        { $count: "count" }
                    ],
                    countryStats: [
                        {
                            $group: {
                                _id: "$clicks.location.country",
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: -1 } }
                    ],
                    deviceStats: [
                        {
                            $group: {
                                _id: {
                                    $cond: [
                                        {
                                            $regexMatch: {
                                                input: "$clicks.userAgent",
                                                regex: /(Mobi|Android|iPhone|iPad)/i
                                            }
                                        },
                                        "Mobile",
                                        "Desktop"
                                    ]
                                },
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    browserStats: [
                        {
                            $group: {
                                _id: {
                                    $switch: {
                                        branches: [
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Chrome/i } },
                                                then: "Chrome"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Firefox/i } },
                                                then: "Firefox"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Safari/i } },
                                                then: "Safari"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Edg/i } },
                                                then: "Edge"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /OPR|Opera/i } },
                                                then: "Opera"
                                            }
                                        ],
                                        default: "Other"
                                    }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: -1 } }
                    ]
                }
            }

        ]);

        const result = analytics[0];

        res.json({
            today: result.today[0]?.count || 0,
            yesterday: result.yesterday[0]?.count || 0,
            last7Days: result.last7Days[0]?.count || 0,
            last30Days: result.last30Days[0]?.count || 0,
            countryStats: result.countryStats,
            deviceStats: result.deviceStats,
            browserStats: result.browserStats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Analytics aggregation failed" });
    }
};

// analytics for single url
export const getSingleUrlAnalytics = async (req, res) => {
    await connectDB();

    const { id } = req.params;
    const userId = req.user.id;

    let urlId;
    try {
        urlId = new mongoose.Types.ObjectId(id);
    } catch (error) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    try {
        const url = await urlData.findOne({ _id: urlId, createdBy: userId });

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        const now = new Date();
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const startOfYesterday = new Date(new Date(startOfToday).setDate(startOfToday.getDate() - 1));
        const startOf7Days = new Date(new Date().setDate(now.getDate() - 6));
        const startOf30Days = new Date(new Date().setDate(now.getDate() - 29));

        const analytics = await urlData.aggregate([
            { $match: { _id: urlId } },
            { $unwind: "$clicks" },
            {
                $facet: {
                    today: [
                        { $match: { "clicks.clickedAt": { $gte: startOfToday } } },
                        { $count: "count" }
                    ],
                    yesterday: [
                        {
                            $match: {
                                "clicks.clickedAt": {
                                    $gte: startOfYesterday,
                                    $lt: startOfToday
                                }
                            }
                        },
                        { $count: "count" }
                    ],
                    last7Days: [
                        { $match: { "clicks.clickedAt": { $gte: startOf7Days } } },
                        { $count: "count" }
                    ],
                    last30Days: [
                        { $match: { "clicks.clickedAt": { $gte: startOf30Days } } },
                        { $count: "count" }
                    ],
                    countryStats: [
                        {
                            $group: {
                                _id: "$clicks.location.country",
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: -1 } }
                    ],
                    deviceStats: [
                        {
                            $group: {
                                _id: {
                                    $cond: [
                                        {
                                            $regexMatch: {
                                                input: "$clicks.userAgent",
                                                regex: /(Mobi|Android|iPhone|iPad)/i
                                            }
                                        },
                                        "Mobile",
                                        "Desktop"
                                    ]
                                },
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    browserStats: [
                        {
                            $group: {
                                _id: {
                                    $switch: {
                                        branches: [
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Chrome/i } },
                                                then: "Chrome"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Firefox/i } },
                                                then: "Firefox"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Safari/i } },
                                                then: "Safari"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /Edg/i } },
                                                then: "Edge"
                                            },
                                            {
                                                case: { $regexMatch: { input: "$clicks.userAgent", regex: /OPR|Opera/i } },
                                                then: "Opera"
                                            }
                                        ],
                                        default: "Other"
                                    }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: -1 } }
                    ]
                }
            }
        ]);

        const result = analytics[0];

        res.json({
            today: result.today[0]?.count || 0,
            yesterday: result.yesterday[0]?.count || 0,
            last7Days: result.last7Days[0]?.count || 0,
            last30Days: result.last30Days[0]?.count || 0,
            countryStats: result.countryStats,
            deviceStats: result.deviceStats,
            browserStats: result.browserStats
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
};

