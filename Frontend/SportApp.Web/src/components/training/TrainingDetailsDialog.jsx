import { useTranslation } from "react-i18next";
import { useState } from "react";

function formatTrainingDate(date)
{
    return new Date(date).toLocaleString("pl-PL");
}

function formatDateTimeLocal(date)
{
    const localDate = new Date(date);
    const offset = localDate.getTimezoneOffset();

    const adjustedDate = new Date(
        localDate.getTime() - offset * 60000
    );

    return adjustedDate.toISOString().slice(0, 16);
}


function TrainingDetailsDialog({ training, onClose })
{
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);

    const [type, setType] = useState(training?.type ?? "Running");
    const [date, setDate] = useState(training ? formatDateTimeLocal(training.date) : "");
    const [duration, setDuration] = useState(training?.duration ?? "");
    const [distance, setDistance] = useState(training?.distance ?? "");
    const [calories, setCalories] = useState(training?.calories ?? "");
    const [description, setDescription] = useState(training?.description ?? "");

    if (!training)
    {
        return null;
    }
    const startEditing = () =>
    {
        setType(training.type);
        setDate(formatDateTimeLocal(training.date));
        setDuration(training.duration);
        setDistance(training.distance);
        setCalories(training.calories);
        setDescription(training.description ?? "");

        setIsEditing(true);
    };

    const handleClose = () =>
    {
        setIsEditing(false);
        onClose();
    };

    return (
        <dialog open>
            

            {!isEditing ? (
                <>
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
                        onClick={startEditing}
                    >
                        {t("common.edit")}
                    </button>
                </>
            ) : (
                <form>
                    <div>
                        <label>
                            {t("training.type")}
                        </label>

                        <select
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                        >
                            <option value="Running">
                                {t("training.types.Running")}
                            </option>

                            <option value="Cycling">
                                {t("training.types.Cycling")}
                            </option>

                            <option value="Walking">
                                {t("training.types.Walking")}
                            </option>

                            <option value="Gym">
                                {t("training.types.Gym")}
                            </option>

                            <option value="Swimming">
                                {t("training.types.Swimming")}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label>
                            {t("training.date")}
                        </label>

                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </div>

                    <div>
                        <label>
                            {t("training.duration")}
                        </label>

                        <input
                            type="number"
                            value={duration}
                            onChange={(event) => setDuration(event.target.value)}
                        />
                    </div>

                    <div>
                        <label>
                            {t("training.distance")}
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            value={distance}
                            onChange={(event) => setDistance(event.target.value)}
                        />
                    </div>

                    <div>
                        <label>
                            {t("training.calories")}
                        </label>

                        <input
                            type="number"
                            value={calories}
                            onChange={(event) => setCalories(event.target.value)}
                        />
                    </div>

                    <div>
                        <label>
                            {t("training.description")}
                        </label>

                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                    >
                        {t("common.save")}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                    >
                        {t("common.cancel")}
                    </button>
                </form>
            )}

            <button
                type="button"
                onClick={handleClose}
            >
                {t("common.close")}
            </button>
        </dialog>
    );
}

export default TrainingDetailsDialog;