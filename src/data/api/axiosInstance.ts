import { notifications } from "@mantine/notifications";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token)
            config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if (typeof window !== "undefined") {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
            }
            else {
                const msg = error.response?.data?.message ?? error.message ?? "Произошла неизвестная ошибка";
                notifications.show({
                    title: "Ошибка",
                    message: msg,
                    color: "red",
                    position: "top-right"
                });
            }
        }
        return Promise.reject(error);
    }
);

export default api;