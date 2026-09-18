import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { getTrainings } from "../api/trainingApi"
import TrainingDetailsDialog from "../components/training/TrainingDetailsDialog"

import "../styles/TrainingPage.css"

function getStartOfDayUtc(dateString) {
  if (!dateString) {
    return undefined
  }

  const date = new Date(`${dateString}T00:00:00`)
  return date.toISOString()
}

function getEndOfDayUtc(dateString) {
  if (!dateString) {
    return undefined
  }

  const date = new Date(`${dateString}T23:59:59.999`)
  return date.toISOString()
}
function formatTrainingDate(date) {
  return new Date(date).toLocaleString("pl-PL")
}

function TrainingPage() {
  const { t } = useTranslation()

  const [trainings, setTrainings] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [filterType, setFilterType] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5)

  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const [selectedTraining, setSelectedTraining] = useState(null)
  const [isCreating, setIsCreating] = useState(false)

  const loadTrainings = async (
    page = 1,
    filters = {
      fromDate,
      toDate,
      filterType,
    },
  ) => {
    setIsLoading(true)
    setError("")

    try {
      const data = await getTrainings({
        from: getStartOfDayUtc(filters.fromDate),
        to: getEndOfDayUtc(filters.toDate),
        type: filters.filterType || undefined,
        page,
        pageSize,
      })

      if (
        data.items.length === 0 &&
        data.totalPages > 0 &&
        page > data.totalPages
      ) {
        return loadTrainings(data.totalPages, filters)
      }

      setTrainings(data.items)
      setTotalPages(data.totalPages)
      setTotalItems(data.totalItems)
      setCurrentPage(page)
    } catch (error) {
      console.error("Get trainings error:", error)

      setError(t("training.loadError"))
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadTrainings(1)
  }, [])

  const handleResetFilters = () => {
    setFromDate("")
    setToDate("")
    setFilterType("")

    loadTrainings(1, {
      fromDate: "",
      toDate: "",
      filterType: "",
    })
  }

  if (isLoading) {
    return <p>{t("training.loading")}</p>
  }

  const handleTrainingUpdated = (updatedTraining) => {
    setTrainings((currentTrainings) =>
      currentTrainings.map((training) =>
        training.id === updatedTraining.id ? updatedTraining : training,
      ),
    )

    setSelectedTraining(updatedTraining)
  }

  return (
    <div className="training-page">
      <h1>{t("training.title")}</h1>
      <button
        type="button"
        onClick={() => {
          setSelectedTraining(null)
          setIsCreating(true)
        }}
      >
        {t("training.add")}
      </button>
      <div>
        <div>
          <label htmlFor="fromDate">{t("training.fromDate")}</label>

          <input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(event) => {
              const newFromDate = event.target.value
              setFromDate(newFromDate)
              if (toDate && newFromDate > toDate) {
                setToDate("")
              }
            }}
          />
        </div>

        <div>
          <label htmlFor="toDate">{t("training.toDate")}</label>

          <input
            id="toDate"
            type="date"
            min={fromDate}
            value={toDate}
            onChange={(event) => setToDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="filterType">{t("training.type")}</label>

          <select
            id="filterType"
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            <option value="">{t("training.allTypes")}</option>

            <option value="Running">{t("training.types.Running")}</option>

            <option value="Cycling">{t("training.types.Cycling")}</option>

            <option value="Walking">{t("training.types.Walking")}</option>

            <option value="Gym">{t("training.types.Gym")}</option>

            <option value="Swimming">{t("training.types.Swimming")}</option>
          </select>
        </div>

        <button type="button" onClick={() => loadTrainings(1)}>
          {t("training.search")}
        </button>
        <button type="button" onClick={handleResetFilters}>
          {t("training.resetFilters")}
        </button>
      </div>

      {error && <p>{error}</p>}

      {!error && trainings.length === 0 && <p>{t("training.empty")}</p>}

      {trainings.length > 0 && (
        <div>
          {trainings.map((training) => (
            <div
              key={training.id}
              onClick={() => setSelectedTraining(training)}
              role="button"
              tabIndex={0}
            >
              <h2>{t(`training.types.${training.type}`)}</h2>

              <p>
                {t("training.date")}: {formatTrainingDate(training.date)}
              </p>
            </div>
          ))}
        </div>
      )}

      {trainings.length > 0 && totalPages > 1 && (
        <div>
          <button
            type="button"
            onClick={() => loadTrainings(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t("training.previousPage")}
          </button>

          <span>
            {" "}
            {t("training.page")} {currentPage} / {totalPages}{" "}
          </span>

          <button
            type="button"
            onClick={() => loadTrainings(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t("training.nextPage")}
          </button>
        </div>
      )}
      {(selectedTraining || isCreating) && (
        <TrainingDetailsDialog
          training={selectedTraining}
          isCreating={isCreating}
          onClose={() => {
            setSelectedTraining(null)
            setIsCreating(false)
          }}
          onUpdated={handleTrainingUpdated}
          onCreated={() => {
            setIsCreating(false)
            loadTrainings(currentPage)
          }}
        />
      )}
    </div>
  )
}

export default TrainingPage
