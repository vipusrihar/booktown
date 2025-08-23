import axios from "axios";

const API_BASE_URL ="http://localhost:8080/api/v1";

// Default timeout (5 seconds)
const DEFAULT_TIMEOUT = 5000;

// Create secured Axios instance
export const securedApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// Request interceptor for auth tokens
securedApi.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem("token");
    console.log("token :",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Optional: API for public endpoints (no auth required)
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to add security headers
const addSecurityHeaders = (config) => {
  config.headers["X-Content-Type-Options"] = "nosniff";
  config.headers["X-Frame-Options"] = "DENY";
  config.headers["X-XSS-Protection"] = "1; mode=block";
  return config;
};

// Apply security headers to both instances
// securedApi.interceptors.request.use(addSecurityHeaders);
// publicApi.interceptors.request.use(addSecurityHeaders);