import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getTrainings, createTraining } from "../api/trainingApi";


function TrainingPage() {
    const { t } = useTranslation();

    const [trainings, setTrainings] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [isCreating, setIsCreating] = useState(false);

    const [type, setType] = useState("Running");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [calories, setCalories] = useState("");
    const [description, setDescription] = useState("");

    const [isSaving, setIsSaving] = useState(false);
    const [createError, setCreateError] = useState("");

    useEffect(() => {
        const loadTrainings = async () => {
            try {
                const data = await getTrainings();

                setTrainings(data.items);
            } catch (error) {
                console.error("Get trainings error:", error);

                setError(t("training.loadError"));
            } finally {
                setIsLoading(false);
            }
        };

        loadTrainings();
    }, [t]);

    if (isLoading) {
        return <p>{t("training.loading")}</p>;
    }

    const handleCreateTraining = async (event) => 
    {
        event.preventDefault();

        setCreateError("");
        setIsSaving(true);

        try 
        {
            const newTraining = await createTraining({
                type,
                date,
                duration: Number(duration),
                distance: Number(distance),
                calories: Number(calories),
                description
            });

            setTrainings((currentTrainings) => [
                newTraining,
             ...currentTrainings
            ]);

            setType("Running");
            setDate("");
            setDuration("");
            setDistance("");
            setCalories("");
            setDescription("");

            setIsCreating(false);
        } 
        catch (error) 
        {
            console.error("Create training error:", error);
            setCreateError(t("training.createError"));
        } 
        finally 
        {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <h1>{t("training.title")}</h1>
            <button
                type="button"
                onClick={() => {
                    setCreateError("");
                    setIsCreating(true);
                }}
>
                {t("training.add")}
            </button>

            {isCreating && (
                <form onSubmit={handleCreateTraining}>
                    {/* formularz dodamy tutaj */}
                </form>
            )}

            {error && <p>{error}</p>}

            {!error && trainings.length === 0 && (
                <p>{t("training.empty")}</p>
            )}

            {trainings.length > 0 && (
                <div>
                    {trainings.map((training) => (
                        <div key={training.id}>
                            <h2>
                                {t(`training.types.${training.type}`)}
                            </h2>

                            <p>
                                {t("training.date")}: {training.date}
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TrainingPage;