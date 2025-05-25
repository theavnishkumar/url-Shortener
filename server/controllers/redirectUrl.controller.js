import urlData from "../models/urlData.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";
import { connectDB } from "../connection.js";

export const handleGetRedirectUrl = async (req, res) => {
    const { id } = req.params;

    try {
        await connectDB();
        const RedirectURL = await urlData.findOne({ shortId: id }).select("originalUrl clicks");
        if (!RedirectURL) return res.status(404).json({ message: "No Short URL" });
        const ip = getClientIp(req);
        const userAgent = req.headers["user-agent"];
        const location = await getLocationFromIp(ip);

        RedirectURL.clicks.push({
            ipAddress: ip,
            userAgent,
            location,
        });

        await RedirectURL.save();

        return res.status(200).json({redirectUrl:RedirectURL.originalUrl})

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}