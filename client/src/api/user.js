import axios from "axios";
const VITE_USER_API = import.meta.env.VITE_USER_API;

export const changePassword = async (formData) => {
    try {
        const res = await axios.patch(`${VITE_USER_API}`,
            formData,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't update password")
        throw error;
    }
}

export const loginHistory = async () => {
    try {
        const res = await axios.get(`${VITE_USER_API}/logins`,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Can't show login history")
        throw error;
    }
}