import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import StatisticsPage from "../pages/StatisticsPage";
import GoodbyePage from "../pages/GoodbyePage";
import ProtectedRoute from "./ProtectedRoutes";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                </Route>

                <Route path="/goodbye" element={<GoodbyePage />} />

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;