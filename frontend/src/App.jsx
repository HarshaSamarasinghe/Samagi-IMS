import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ArticlesPage from "./pages/ArticlesPage";
import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage";
import Loading from "./components/Loading";

function App() {
    const { loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes with layout */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/articles" element={<ArticlesPage />} />
                </Route>
            </Route>

            {/* Admin-only routes */}
            <Route element={<ProtectedRoute adminOnly />}>
                <Route element={<Layout />}>
                    <Route path="/users" element={<UsersPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
