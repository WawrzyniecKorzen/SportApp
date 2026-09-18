import { useTranslation } from "react-i18next"
import { useState } from "react"

import {
  updateTraining,
  getTrainingById,
  createTraining,
} from "../../api/trainingApi"

import { getUtcDate } from "../../helpers/dateUtils"

import "../../styles/TrainingDetailsDialog.css"

function formatTrainingDate(date) {
  return new Date(date).toLocaleString("pl-PL")
}

function formatDateTimeLocal(date) {
  const localDate = new Date(date)
  const offset = localDate.getTimezoneOffset()

  const adjustedDate = new Date(localDate.getTime() - offset * 60000)

  return adjustedDate.toISOString().slice(0, 16)
}

function TrainingDetailsDialog({
  training,
  isCreating,
  onClose,
  onUpdated,
  onCreated,
}) {
  const { t } = useTranslation()

  const [isEditing, setIsEditing] = useState(false)

  const [type, setType] = useState(training?.type ?? "Running")

  const [date, setDate] = useState(
    training ? formatDateTimeLocal(training.date) : "",
  )

  const [duration, setDuration] = useState(training?.duration ?? "")

  const [distance, setDistance] = useState(training?.distance ?? "")

  const [calories, setCalories] = useState(training?.calories ?? "")

  const [description, setDescription] = useState(training?.description ?? "")

  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  const startEditing = () => {
    if (!training) {
      return
    }

    setType(training.type)
    setDate(formatDateTimeLocal(training.date))
    setDuration(training.duration)
    setDistance(training.distance)
    setCalories(training.calories)
    setDescription(training.description ?? "")

    setSaveError("")
    setIsEditing(true)
  }

  const handleClose = () => {
    setIsEditing(false)
    setSaveError("")

    onClose()
  }

  const handleSave = async (event) => {
    event.preventDefault()

    setSaveError("")

    if (!date) {
      setSaveError(t("training.validation.dateRequired"))
      return
    }

    if (!duration || Number(duration) <= 0) {
      setSaveError(t("training.validation.durationRequired"))
      return
    }

    if (type !== "Gym" && (!distance || Number(distance) <= 0)) {
      setSaveError(t("training.validation.distanceRequired"))

      return
    }

    setIsSaving(true)

    try {
      const trainingData = {
        type,
        date: getUtcDate(date),
        duration: Number(duration),
        distance: Number(distance),
        calories: Number(calories),
        description,
      }

      if (isCreating) {
        const newTraining = await createTraining(trainingData)

        onCreated(newTraining)
      } else {
        await updateTraining(training.id, trainingData)

        const updatedTraining = await getTrainingById(training.id)

        onUpdated(updatedTraining)
      }

      setIsEditing(false)
    } catch (error) {
      console.error("Update training error:", error)

      setSaveError(t("training.updateError"))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <dialog open className="training-details-dialog">
      {!isEditing && !isCreating ? (
        <>
          <h2 className="training-details-dialog__title">
            {t(`training.types.${training.type}`)}
          </h2>

          <div className="training-details-dialog__details">
            <p>
              <span>{t("training.date")}:</span>{" "}
              {formatTrainingDate(training.date)}
            </p>

            <p>
              <span>{t("training.duration")}:</span> {training.duration}{" "}
              {t("training.minutes")}
            </p>

            <p>
              <span>{t("training.distance")}:</span> {training.distance}{" "}
              {t("training.kilometers")}
            </p>

            <p>
              <span>{t("training.calories")}:</span> {training.calories}
            </p>

            {training.description && (
              <p>
                <span>{t("training.description")}:</span> {training.description}
              </p>
            )}
          </div>

          <div className="training-details-dialog__actions">
            <button
              className="training-details-dialog__edit"
              type="button"
              onClick={startEditing}
            >
              {t("common.edit")}
            </button>

            <button
              className="training-details-dialog__close"
              type="button"
              onClick={handleClose}
            >
              {t("common.close")}
            </button>
          </div>
        </>
      ) : (
        <>
          {isCreating && (
            <h2 className="training-details-dialog__title">
              {t("training.add")}
            </h2>
          )}

          {!isCreating && (
            <h2 className="training-details-dialog__title">
              {t("common.edit")}
            </h2>
          )}

          <form className="training-details-dialog__form" onSubmit={handleSave}>
            <div className="training-details-dialog__field">
              <label htmlFor="training-type">{t("training.type")}</label>

              <select
                id="training-type"
                value={type}
                onChange={(event) => {
                  const newType = event.target.value

                  setType(newType)

                  if (newType === "Gym") {
                    setDistance(0)
                  }
                }}
              >
                <option value="Running">{t("training.types.Running")}</option>

                <option value="Cycling">{t("training.types.Cycling")}</option>

                <option value="Walking">{t("training.types.Walking")}</option>

                <option value="Gym">{t("training.types.Gym")}</option>

                <option value="Swimming">{t("training.types.Swimming")}</option>
              </select>
            </div>

            <div className="training-details-dialog__field">
              <label htmlFor="training-date">{t("training.date")}</label>

              <input
                id="training-date"
                type="datetime-local"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div className="training-details-dialog__field">
              <label htmlFor="training-duration">
                {t("training.duration")}
              </label>

              <input
                id="training-duration"
                type="number"
                min="1"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
            </div>

            <div className="training-details-dialog__field">
              <label htmlFor="training-distance">
                {t("training.distance")}
              </label>

              <input
                id="training-distance"
                type="number"
                min="0"
                step="0.01"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
                disabled={type === "Gym"}
              />
            </div>

            <div className="training-details-dialog__field">
              <label htmlFor="training-calories">
                {t("training.calories")}
              </label>

              <input
                id="training-calories"
                type="number"
                min="0"
                value={calories}
                onChange={(event) => setCalories(event.target.value)}
              />
            </div>

            <div className="training-details-dialog__field">
              <label htmlFor="training-description">
                {t("training.description")}
              </label>

              <textarea
                id="training-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            {saveError && (
              <p className="training-details-dialog__error">{saveError}</p>
            )}

            <div className="training-details-dialog__actions">
              <button
                className="training-details-dialog__save"
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? t("training.saving") : t("common.save")}
              </button>

              <button
                className="training-details-dialog__cancel"
                type="button"
                onClick={handleClose}
              >
                {t("common.cancel")}
              </button>
            </div>
          </form>

          <div className="training-details-dialog__footer">
            <button
              className="training-details-dialog__close"
              type="button"
              onClick={handleClose}
            >
              {t("common.close")}
            </button>
          </div>
        </>
      )}
    </dialog>
  )
}

export default TrainingDetailsDialog
