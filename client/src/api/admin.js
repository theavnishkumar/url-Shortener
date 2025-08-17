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

export const getAllUsers = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams({
            page: params.page || 1,
            limit: params.limit || 20,
            search: params.search || "",
            sortBy: params.sortBy || "signupAt",
            sortOrder: params.sortOrder || "desc"
        });

        const res = await axios.get(`${VITE_ADMIN_API}/users?${queryParams}`, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.message || "Can't fetch users data");
        throw error;
    }
};

export const getUserUrls = async (userId, params = {}) => {
    try {
        const queryParams = new URLSearchParams({
            page: params.page || 1,
            limit: params.limit || 20,
            sortBy: params.sortBy || "createdAt",
            sortOrder: params.sortOrder || "desc"
        });

        const res = await axios.get(`${VITE_ADMIN_API}/users/${userId}/urls?${queryParams}`, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.message || "Can't fetch user URLs");
        throw error;
    }
};
