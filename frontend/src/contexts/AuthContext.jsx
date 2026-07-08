import { createContext, useContext, useState, useEffect } from "react";
import api, { getCsrfCookie } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // Check if user is already authenticated on mount
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await api.get("/user");
            setUser(response.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password, remember = false) => {
        setErrors({});
        try {
            await getCsrfCookie();
            const response = await api.post("/login", { email, password, remember });
            setUser(response.data.user);
            return { success: true };
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ email: ["Something went wrong. Please try again."] });
            }
            return { success: false };
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch {
            // Ignore errors on logout
        } finally {
            setUser(null);
        }
    };

    const isAdmin = user?.role === "admin";

    const value = {
        user,
        loading,
        errors,
        setErrors,
        login,
        logout,
        fetchUser,
        isAdmin,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
