import axios from "axios";
const URL_API = import.meta.env.VITE_URL_API;
const VITE_BASE_API = import.meta.env.VITE_BASE_API;
const VITE_ANALYTICS_API = import.meta.env.VITE_ANALYTICS_API;

export const saveShortUrl = async (originalUrl) => {
    try {
        const res = await axios.post(
            `${URL_API}/create`,
            { originalUrl },
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error creating short url", error.response?.data || error.message)
    }
}

export const getUrlData = async () => {
    try {
        const res = await axios.get(`${URL_API}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on getting url data", error.message);
    }
}

export const deleteUrl = async (_id) => {
    try {
        const res = await axios.delete(`${URL_API}/${_id}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log("Error on deleting url data", error.message);
    }
}

export const redirectUrl = async (shortId) => {
    try {
        const res = await axios.get(`${VITE_BASE_API}/redirect/${shortId}`);
        return res.data;
    } catch (error) {
        console.error("Error while redirecting:", error.message);
        throw new Error("Short URL not found");
    }
}

export const getUrlAnalytics = async () => {
    try {
        const res = await axios.get(`${VITE_ANALYTICS_API}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.error("Error showing analytics:", error.message);
        throw new Error("Analytics not found");
    }
}