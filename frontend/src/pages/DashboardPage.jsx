import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const DashboardPage = () => {
    const { user, isAdmin } = useAuth();
    const [stats, setStats] = useState({ articles: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const articlesRes = await api.get("/articles?per_page=1");
                setStats({ articles: articlesRes.data.total || 0 });
            } catch {
                // Silently fail
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, {user?.first_name} 👋</h1>
                <p className="text-gray-400 text-sm mt-1">Here&apos;s what&apos;s happening with your account</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{loading ? "—" : stats.articles}</p>
                        <p className="text-sm text-gray-400">{isAdmin ? "Total Articles" : "Your Articles"}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900 capitalize">{user?.role || "—"}</p>
                        <p className="text-sm text-gray-400">Your Role</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg font-bold text-gray-900 truncate">{user?.email || "—"}</p>
                        <p className="text-sm text-gray-400">Email Address</p>
                    </div>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="px-6 pt-5 pb-3 border-b border-gray-50">
                    <h5 className="font-semibold text-gray-900">Profile Information</h5>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
                    {[
                        { label: "Full Name", value: `${user?.first_name ?? ""} ${user?.last_name ?? ""}` },
                        { label: "Phone Number", value: user?.phone_number || "Not set" },
                        { label: "NIC", value: user?.nic || "Not set" },
                        { label: "Address", value: user?.address || "Not set" },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <p className="text-xs text-gray-400 mb-1">{label}</p>
                            <p className="text-sm font-medium text-gray-800">{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
