import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getTrainings, createTraining } from "../api/trainingApi";
import TrainingDetailsDialog from "../components/training/TrainingDetailsDialog";
import { getUtcDate } from "../helpers/dateUtils";

function getStartOfDayUtc(dateString) 
{
    if (!dateString) 
    {
        return undefined;
    }

    const date = new Date(`${dateString}T00:00:00`);
    return date.toISOString();
}

function getEndOfDayUtc(dateString) 
{
    if (!dateString) 
    {
        return undefined;
    }

    const date = new Date(`${dateString}T23:59:59.999`);
    return date.toISOString();
}
function formatTrainingDate(date) 
{
    return new Date(date).toLocaleString("pl-PL");
}

function TrainingPage() 
{
    const { t } = useTranslation();

    const [trainings, setTrainings] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filterType, setFilterType] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);

    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [isCreating, setIsCreating] = useState(false);

    const [type, setType] = useState("Running");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [calories, setCalories] = useState("");
    const [description, setDescription] = useState("");

    const [isSaving, setIsSaving] = useState(false);
    const [createError, setCreateError] = useState("");

    const [selectedTraining, setSelectedTraining] = useState(null);

    const loadTrainings = async (
        page = 1,
        filters = {
            fromDate,
            toDate,
            filterType
        }) => 
    {
        setIsLoading(true);
        setError("");

        try {
            const data = await getTrainings({
                from: getStartOfDayUtc(filters.fromDate),
                to: getEndOfDayUtc(filters.toDate),
                type: filters.filterType || undefined,
                page,
                pageSize
            });

            if (data.items.length === 0 && data.totalPages > 0 && page > data.totalPages) 
            {
                return loadTrainings(data.totalPages, filters);
            }

            setTrainings(data.items);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
            setCurrentPage(page);
        } catch (error) {
            console.error("Get trainings error:", error);

            setError(t("training.loadError"));
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => 
    {
        loadTrainings(1);
    }, []);

    const handleResetFilters = () => 
    {
        setFromDate("");
        setToDate("");
        setFilterType("");

        loadTrainings(1, 
        {
            fromDate: "",
            toDate: "",
            filterType: ""
        });
    };

    if (isLoading) 
    {
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
                date: getUtcDate(date),
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

    const handleTrainingUpdated = (updatedTraining) =>
    {
        setTrainings((currentTrainings) =>
            currentTrainings.map((training) =>
                training.id === updatedTraining.id
                    ? updatedTraining
                    : training
            )
        );

        setSelectedTraining(updatedTraining);
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
            <div>
                <div>
                    <label htmlFor="fromDate">
                        {t("training.fromDate")}
                    </label>

                    <input
                        id="fromDate"
                        type="date"
                        value={fromDate}
                        onChange={(event) => 
                        {
                            const newFromDate = event.target.value;
                            setFromDate(newFromDate);
                            if (toDate && newFromDate > toDate)
                            {
                                setToDate("");
                            }
                        }
                    }
                    />
                </div>

                <div>
                    <label htmlFor="toDate">
                        {t("training.toDate")}
                    </label>

                    <input
                        id="toDate"
                        type="date"
                        min={fromDate}
                        value={toDate}
                        onChange={(event) => setToDate(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="filterType">
                        {t("training.type")}
                    </label>

                    <select
                        id="filterType"
                        value={filterType}
                        onChange={(event) => setFilterType(event.target.value)}
                    >
                        <option value="">
                            {t("training.allTypes")}
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

                <button type="button" onClick={() => loadTrainings(1)}>
                    {t("training.search")}
                </button>
                <button type="button" onClick={handleResetFilters}>
                    {t("training.resetFilters")}
                </button>
            </div>

            
{isCreating && (
    <form onSubmit={handleCreateTraining}>
        <div>
            <label htmlFor="trainingType">
                {t("training.type")}
            </label>

            <select
                id="trainingType"
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
            <label htmlFor="trainingDate">
                {t("training.date")}
            </label>

            <input
                id="trainingDate"
                type="datetime-local"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="trainingDuration">
                {t("training.duration")}
            </label>

            <input
                id="trainingDuration"
                type="number"
                min="1"
                max="1440"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="trainingDistance">
                {t("training.distance")}
            </label>

            <input
                id="trainingDistance"
                type="number"
                min="0"
                max="1000"
                step="0.01"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="trainingCalories">
                {t("training.calories")}
            </label>

            <input
                id="trainingCalories"
                type="number"
                min="0"
                max="100000"
                value={calories}
                onChange={(event) => setCalories(event.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="trainingDescription">
                {t("training.description")}
            </label>

            <textarea
                id="trainingDescription"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
        </div>

        {createError && <p>{createError}</p>}

        <button type="submit" disabled={isSaving}>
            {isSaving
                ? t("training.saving")
                : t("common.save")}
        </button>

        <button
            type="button"
            onClick={() => {
                setCreateError("");
                setIsCreating(false);
            }}
            disabled={isSaving}
        >
            {t("common.cancel")}
        </button>
    </form>
)}


            {error && <p>{error}</p>}

            {!error && trainings.length === 0 && (
                <p>{t("training.empty")}</p>
            )}

            {trainings.length > 0 && (
                <div>
                    {trainings.map((training) => (
                    <div
                        key={training.id}
                        onClick={() => setSelectedTraining(training)}
                        role="button"
                        tabIndex={0}
                    >
                        <h2>
                            {t(`training.types.${training.type}`)}
                        </h2>

                        <p>
                            {t("training.date")}:{" "}
                            {formatTrainingDate(training.date)}
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
            {t("training.page")} {currentPage} / {totalPages}
            {" "}
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

    <TrainingDetailsDialog
        training={selectedTraining}
        onClose={() => setSelectedTraining(null)}
        onUpdated={handleTrainingUpdated}
    />
</div>
    );
}

export default TrainingPage;