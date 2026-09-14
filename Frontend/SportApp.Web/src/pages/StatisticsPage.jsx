import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getTrainingStats } from "../api/trainingApi";

function StatisticsPage() {
    const { t } = useTranslation();

    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getTrainingStats();

                setStats(data);
            } catch (error) {
                console.error("Get training stats error:", error);

                setError(t("statistics.loadError"));
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, [t]);

    if (isLoading) {
        return <p>{t("statistics.loading")}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>{t("statistics.title")}</h1>

            <p>
                {t("statistics.totalTrainings")}:{" "}
                {stats.totalTrainings}
            </p>

            <p>
                {t("statistics.totalDuration")}:{" "}
                {stats.totalDuration}{" "}
                {t("training.minutes")}
            </p>

            <p>
                {t("statistics.totalDistance")}:{" "}
                {stats.totalDistance}{" "}
                {t("training.kilometers")}
            </p>

            <p>
                {t("statistics.totalCalories")}:{" "}
                {stats.totalCalories}
            </p>
        </div>
    );
}

export default StatisticsPage;