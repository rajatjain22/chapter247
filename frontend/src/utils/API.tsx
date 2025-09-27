import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api", withCredentials: true, });

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                const currentPath = window.location.pathname;
                if (currentPath !== "/signin" && currentPath !== "/signup") {
                    window.location.href = "/signin";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default API;
