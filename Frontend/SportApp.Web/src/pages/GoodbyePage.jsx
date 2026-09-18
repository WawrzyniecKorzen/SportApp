import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { useAuth } from "../context/useAuth"

import "../styles/GoodbyePage.css"

function GoodbyePage() {
  const { t } = useTranslation()
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return (
    <div className="goodbye-page">
      <h1>{t("goodbye.title")}</h1>

      <p>{t("goodbye.message")}</p>

      <div>
        <Link to="/login">{t("goodbye.login")}</Link>

        {" | "}

        <Link to="/register">{t("goodbye.register")}</Link>
      </div>
    </div>
  )
}

export default GoodbyePage
