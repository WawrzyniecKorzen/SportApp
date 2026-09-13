import { useTranslation } from "react-i18next";

function formatTrainingDate(date)
{
    return new Date(date).toLocaleString("pl-PL");
}

function TrainingDetailsDialog({ training, onClose })
{
    const { t } = useTranslation();

    if (!training)
    {
        return null;
    }

    return (
        <dialog open>
            <h2>
                {t(`training.types.${training.type}`)}
            </h2>

            <p>
                {t("training.date")}:{" "}
                {formatTrainingDate(training.date)}
            </p>

            <p>
                {t("training.duration")}:{" "}
                {training.duration}{" "}
                {t("training.minutes")}
            </p>

            <p>
                {t("training.distance")}:{" "}
                {training.distance}{" "}
                {t("training.kilometers")}
            </p>

            <p>
                {t("training.calories")}:{" "}
                {training.calories}
            </p>

            {training.description && (
                <p>
                    {t("training.description")}:{" "}
                    {training.description}
                </p>
            )}

            <button
                type="button"
                onClick={onClose}
            >
                {t("common.close")}
            </button>
        </dialog>
    );
}

export default TrainingDetailsDialog;