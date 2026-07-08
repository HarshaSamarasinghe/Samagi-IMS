import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api", // or your actual backend URL
    withCredentials: true,    // Essential for capturing/sending session cookies
    withXSRFToken: true,      // CRITICAL: Tells Axios to read the cookie and pass the X-XSRF-TOKEN header
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});


// Fetch CSRF cookie before login — required for Sanctum SPA auth
export const getCsrfCookie = () => axios.get("http://localhost:8000/sanctum/csrf-cookie",
    { withCredentials: true });


// Response interceptor: redirect to login on 401
// Skip redirect for the initial /user auth-check so public pages can load unauthenticated
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const requestUrl = error.config?.url || "";
            const isAuthCheck = requestUrl.includes("/user");
            const isLoginPage = window.location.pathname === "/login";
            const isHomePage = window.location.pathname === "/";

            if (!isAuthCheck && !isLoginPage && !isHomePage) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;