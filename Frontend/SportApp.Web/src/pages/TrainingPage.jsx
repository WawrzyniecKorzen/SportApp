import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getTrainings } from "../api/trainingApi";

function TrainingPage() {
    const { t } = useTranslation();

    const [trainings, setTrainings] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div>
            <h1>{t("training.title")}</h1>

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