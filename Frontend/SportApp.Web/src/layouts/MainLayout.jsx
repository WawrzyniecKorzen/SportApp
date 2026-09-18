import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { useTranslation } from "react-i18next"

import "../styles/MainLayout.css"

function MainLayout() {
  const { logout } = useAuth()

  const navigate = useNavigate()
  const handleLogout = () => {
    navigate("/goodbye")
  }

  const { t, i18n } = useTranslation()

  const handleLanguageChange = () => {
    const newLanguage = i18n.language === "pl" ? "en" : "pl"

    i18n.changeLanguage(newLanguage)
  }

  return (
    <div className="main-layout">
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
          <button type="button" onClick={handleLanguageChange}>
            {i18n.language === "pl"
              ? t("common.language.english")
              : t("common.language.polish")}
          </button>
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
  )
}

export default MainLayout
