import axios from "axios";
const VITE_BASE_API = import.meta.env.VITE_BASE_API;

export const sendMessage = async (formData) => {
    try {
        const res = await axios.post(`${VITE_BASE_API}/contact`,
            formData,
        )
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.error || "Something went wrong");
        throw error;
    }
}