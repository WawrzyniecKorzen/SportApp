import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { getCurrentUser } from "../api/userApi"
import { getTrainings, getTrainingStats } from "../api/trainingApi"
import { RECENT_TRAININGS_LIMIT } from "../constants/dashboard"

import "../styles/DashboardPage.css"

function DashboardPage() {
  const { t } = useTranslation()

  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState("")
  const [recentTrainings, setRecentTrainings] = useState([])
  const [monthlyStats, setMonthlyStats] = useState(null)

  const loadRecentTrainings = async () => {
    try {
      const data = await getTrainings({
        limit: RECENT_TRAININGS_LIMIT,
      })

      setRecentTrainings(data.items)
    } catch (error) {
      console.error("Get recent trainings error:", error)

      setError(t("dashboard.loadError"))
    }
  }

  const loadMonthlyStats = async () => {
    try {
      const now = new Date()

      const from = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0,
        0,
        0,
        0,
      ).toISOString()

      const to = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      ).toISOString()

      const data = await getTrainingStats({
        from,
        to,
      })

      setMonthlyStats(data)
    } catch (error) {
      console.error("Get monthly stats error:", error)

      setError(t("dashboard.loadError"))
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser()

        console.log("Current user:", user)

        setCurrentUser(user)
      } catch (error) {
        console.error("Get current user error:", error)

        setError(t("dashboard.loadError"))
      }
    }

    loadUser()
    loadRecentTrainings()
    loadMonthlyStats()
  }, [t])

  return (
    <div className="dashboard-page">
      <h1>{t("dashboard.title")}</h1>

      {error && <p>{error}</p>}

      {currentUser && (
        <div>
          <p>
            {t("dashboard.email")}: {currentUser.email}
          </p>

          <p>
            {t("dashboard.firstName")}: {currentUser.firstName}
          </p>

          <p>
            {t("dashboard.lastName")}: {currentUser.lastName}
          </p>
        </div>
      )}

      <section>
        <h2>{t("dashboard.recentTrainings")}</h2>

        {recentTrainings.length === 0 ? (
          <p>{t("dashboard.noRecentTrainings")}</p>
        ) : (
          <div>
            {recentTrainings.map((training) => (
              <div key={training.id}>
                <p>
                  {t("dashboard.trainingType")}:{" "}
                  {t(`training.types.${training.type}`)}
                </p>

                <p>
                  {t("dashboard.trainingDate")}:{" "}
                  {new Date(training.date).toLocaleDateString()}
                </p>

                <p>
                  {t("dashboard.trainingDuration")}: {training.duration}{" "}
                  {t("training.minutes")}
                </p>

                <p>
                  {t("dashboard.trainingDistance")}: {training.distance}{" "}
                  {t("training.kilometers")}
                </p>
              </div>
            ))}
          </div>
        )}
        <Link to="/training">{t("dashboard.viewAllTrainings")}</Link>
      </section>

      <section>
        <h2>{t("dashboard.monthlyStats")}</h2>

        {monthlyStats && (
          <div>
            <p>
              {t("dashboard.totalTrainings")}: {monthlyStats.totalTrainings}
            </p>

            <p>
              {t("dashboard.totalDuration")}: {monthlyStats.totalDuration}{" "}
              {t("training.minutes")}
            </p>

            <p>
              {t("dashboard.totalDistance")}: {monthlyStats.totalDistance}{" "}
              {t("training.kilometers")}
            </p>

            <p>
              {t("dashboard.totalCalories")}: {monthlyStats.totalCalories}
            </p>
          </div>
        )}
        <Link to="/statistics">{t("dashboard.viewFullStatistics")}</Link>
      </section>
    </div>
  )
}

export default DashboardPage
