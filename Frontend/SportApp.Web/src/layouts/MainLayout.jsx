import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import { useTranslation } from "react-i18next";

function MainLayout() {
    const { logout } = useAuth();

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/goodbye");
    };

    const { t } = useTranslation();

    return (
        <div>
            <header>
                <h1>SportApp</h1>

                <nav>
                    <NavLink to="/dashboard">{t("navigation.dashboard")}</NavLink>
                    {" | "}
                    <NavLink to="/training">{t("navigation.training")}</NavLink>
                    {" | "}
                    <NavLink to="/statistics">{t("navigation.statistics")}</NavLink>
                    {" | "}
                    <NavLink to="/profile">{t("navigation.profile")}</NavLink>
                    {" | "}
                    <button type="button" onClick={handleLogout}>
                    {t("common.logout")}
                    </button>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;