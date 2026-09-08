import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import StatisticsPage from "../pages/StatisticsPage";
import GoodbyePage from "../pages/GoodbyePage";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";
import TrainingPage from "../pages/TrainingPage";
import ProfilePage from "../pages/ProfilePage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/training" element={<TrainingPage />} />
                    </Route>
                </Route>

                <Route path="/goodbye" element={<GoodbyePage />} />

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;