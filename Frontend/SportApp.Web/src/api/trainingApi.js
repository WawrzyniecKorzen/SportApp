import apiClient from "./apiClient";

export async function getTrainings() {
    const response = await apiClient.get("/api/Training");

    return response.data;
}

export async function createTraining(trainingData) {
    const response = await apiClient.post(
        "/api/Training",
        trainingData
    );

    return response.data;
}