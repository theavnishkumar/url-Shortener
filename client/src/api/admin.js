import axios from "axios";

const VITE_ADMIN_API = import.meta.env.VITE_ADMIN_API;

export const getAdminDashboard = async () => {
    try {
        const res = await axios.get(`${VITE_ADMIN_API}`, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.message || "Can't fetch admin dashboard data");
        throw error;
    }
};
