import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getTrainingStats } from "../api/trainingApi";

function StatisticsPage() {
    const { t } = useTranslation();

    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const currentYear = new Date().getFullYear();

    const years = [];

    for (let year = currentYear; year >= currentYear - 5; year--) 
    {
        years.push(year);
    }

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
            <div>
                <h2>{t("statistics.filters.title")}</h2>

                <div>
                    <label htmlFor="statistics-year">
                        {t("statistics.filters.year")}
                    </label>

                    <select
                        id="statistics-year"
                        value={selectedYear}
                        onChange={(event) => setSelectedYear(event.target.value)}
                    >
                        <option value="">
                            {t("statistics.filters.allYears")}
                        </option>

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
                    >
                        <option value="">
                            {t("statistics.filters.allMonths")}
                        </option>

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
                        <option value="">
                            {t("statistics.filters.allTypes")}
                        </option>

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
            </div>

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