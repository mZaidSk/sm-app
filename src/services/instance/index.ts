import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";

// Define API URLs using import.meta.env
const API_URL = import.meta.env.VITE_APP_API_URL;

console.log(API_URL); // Check if environment variables are loaded correctly

// Create an Axios instance
const instance: AxiosInstance = axios.create({
    baseURL: API_URL,
});

// Add request interceptor
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Retrieve and sanitize the token
        const token = localStorage.getItem("token")?.replace(/"/g, "");

        config.headers = config.headers ?? {}; // Initialize headers as an empty object if not present

        // Safely add headers
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Ensure default headers
        config.headers["Accept"] = "application/json";
        // config.headers["X-Requested-With"] = "XMLHttpRequest";

        return config;
    },
    (error: AxiosError) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Add response interceptor
instance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error: AxiosError) => {
        // Handle specific error statuses
        if (error.response?.status === 401) {
            console.warn("Unauthorized: Redirecting to login.");
            // Add logic for redirection or token refresh
        } else if (error.response?.status === 500) {
            console.error("Server error:", error.response.data);
        }
        return Promise.reject(error);
    }
);

export { API_URL };
export default instance;
