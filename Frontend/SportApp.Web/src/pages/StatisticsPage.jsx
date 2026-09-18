import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { getTrainingStats } from "../api/trainingApi"

import "../styles/StatisticsPage.css"

function StatisticsPage() {
  const { t } = useTranslation()

  const [stats, setStats] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const [appliedYear, setAppliedYear] = useState("")
  const [appliedMonth, setAppliedMonth] = useState("")
  const [appliedType, setAppliedType] = useState("")

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const currentYear = new Date().getFullYear()

  const years = []

  for (let year = currentYear; year >= currentYear - 5; year--) {
    years.push(year)
  }

  const handleApplyFilters = () => {
    setAppliedYear(selectedYear)
    setAppliedMonth(selectedMonth)
    setAppliedType(selectedType)
  }

  function getDateRange(year, month) {
    if (!year) {
      return {
        from: undefined,
        to: undefined,
      }
    }

    const numericYear = Number(year)

    if (!month) {
      return {
        from: new Date(numericYear, 0, 1, 0, 0, 0, 0).toISOString(),

        to: new Date(numericYear, 11, 31, 23, 59, 59, 999).toISOString(),
      }
    }

    const numericMonth = Number(month)

    return {
      from: new Date(
        numericYear,
        numericMonth - 1,
        1,
        0,
        0,
        0,
        0,
      ).toISOString(),

      to: new Date(numericYear, numericMonth, 0, 23, 59, 59, 999).toISOString(),
    }
  }

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true)
      setError("")

      try {
        const { from, to } = getDateRange(appliedYear, appliedMonth)

        const data = await getTrainingStats({
          from,
          to,
          type: appliedType || undefined,
        })

        setStats(data)
      } catch (error) {
        console.error("Get training stats error:", error)
        setError(t("statistics.loadError"))
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [appliedYear, appliedMonth, appliedType, t])

  if (isLoading) {
    return <p>{t("statistics.loading")}</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="statistics-page">
      <h1>{t("statistics.title")}</h1>
      <div>
        <h2>{t("statistics.filters.title")}</h2>

        <div>
          <label htmlFor="statistics-year">
            {t("statistics.filters.year")}
          </label>

          <select
            id="statistics-year"
            value={selectedYear}
            onChange={(event) => {
              const year = event.target.value

              setSelectedYear(year)

              if (!year) {
                setSelectedMonth("")
              }
            }}
          >
            <option value="">{t("statistics.filters.allYears")}</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="statistics-month">
            {t("statistics.filters.month")}
          </label>

          <select
            id="statistics-month"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            disabled={!selectedYear}
          >
            <option value="">{t("statistics.filters.allMonths")}</option>

            {months.map((month) => (
              <option key={month} value={month}>
                {t(`statistics.months.${month}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="statistics-type">
            {t("statistics.filters.type")}
          </label>

          <select
            id="statistics-type"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="">{t("statistics.filters.allTypes")}</option>

            <option value="Running">{t("training.types.Running")}</option>

            <option value="Cycling">{t("training.types.Cycling")}</option>

            <option value="Walking">{t("training.types.Walking")}</option>

            <option value="Gym">{t("training.types.Gym")}</option>

            <option value="Swimming">{t("training.types.Swimming")}</option>
          </select>
        </div>
      </div>
      <button type="button" onClick={handleApplyFilters}>
        {t("statistics.filters.apply")}
      </button>

      <p>
        {t("statistics.totalTrainings")}: {stats.totalTrainings}
      </p>

      <p>
        {t("statistics.totalDuration")}: {stats.totalDuration}{" "}
        {t("training.minutes")}
      </p>

      <p>
        {t("statistics.totalDistance")}: {stats.totalDistance}{" "}
        {t("training.kilometers")}
      </p>

      <p>
        {t("statistics.totalCalories")}: {stats.totalCalories}
      </p>

      <h2>{t("statistics.byType.title")}</h2>

      {stats.byType.length === 0 ? (
        <p>{t("statistics.byType.empty")}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{t("statistics.byType.type")}</th>
              <th>{t("statistics.byType.trainingsCount")}</th>
              <th>{t("statistics.byType.totalDuration")}</th>
              <th>{t("statistics.byType.totalDistance")}</th>
              <th>{t("statistics.byType.totalCalories")}</th>
            </tr>
          </thead>

          <tbody>
            {stats.byType.map((item) => (
              <tr key={item.type}>
                <td>{t(`training.types.${item.type}`)}</td>

                <td>{item.trainingsCount}</td>

                <td>
                  {item.totalDuration} {t("training.minutes")}
                </td>

                <td>
                  {item.totalDistance} {t("training.kilometers")}
                </td>

                <td>{item.totalCalories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StatisticsPage
